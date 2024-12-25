import { ChangeEvent, useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import UploadBox, { UploadImageBox } from "../../components/upload-box/UploadBox";
import useFileDrop from "../../hooks/use-file-drop";
import { Box, Button, Collapse, Container, Divider, Stack, Typography } from "@mui/material";
import { SVG } from "../../components/icon/Image";
import ChooseOption from "./ChooseOption";
import { preprocess } from "../../utils/detect";
import { CropImage } from "../../utils/renderBox";

const class_mapping = {
  0: 0,
  1: 1,
  12: 2,
  23: 3,
  34: 4,
  45: 5,
  52: 6,
  53: 7,
  54: 8,
  55: 9,
  2: 10,
  3: 11,
  4: 12,
  5: 13,
  6: 14,
  7: 15,
  8: 16,
  9: 17,
  10: 18,
  11: 19,
  13: 20,
  14: 21,
  15: 22,
  16: 23,
  17: 24,
  18: 25,
  19: 26,
  20: 27,
  21: 28,
  22: 29,
  24: 30,
  25: 31,
  26: 32,
  27: 33,
  28: 34,
  29: 35,
  30: 36,
  31: 37,
  32: 38,
  33: 39,
  35: 40,
  36: 41,
  37: 42,
  38: 43,
  39: 44,
  40: 45,
  41: 46,
  42: 47,
  43: 48,
  44: 49,
  46: 50,
  47: 51,
  48: 52,
  49: 53,
  50: 54,
  51: 55,
};

const ImageView = () => {
  const cropRef = useRef();
  const classRef = useRef();
  const confidenceRef = useRef();

  const { file, handleDrop } = useFileDrop();
  const [option, setOption] = useState<null | "choose_image" | "take_image">(null);
  const [loading, setLoading] = useState({ loading: true, progress: 10 });
  const [prcessingStatus, setPrcessingStatus] = useState<
    "not_ready" | "pending_detection" | "pending_classification" | "complete"
  >("not_ready");
  const [detectionModel, setDetectionModel] = useState<any>({
    net: null,
    inputShape: [1, 0, 0, 3],
  });
  const [classificationModel, setClassificationModel] = useState<tf.GraphModel | null>(null);

  useEffect(() => {
    let previousDetectionModel: any = detectionModel.net;
    let previousClassificationModel: any = classificationModel;

    const loadModel = async () => {
      try {
        setLoading({ loading: true, progress: 50 });

        // Dispose previous models if they exist
        if (previousDetectionModel) previousDetectionModel.dispose();
        if (previousClassificationModel) previousClassificationModel.dispose();

        // Load new models
        const detectionModel = await tf.loadGraphModel("detection_web_model/model.json");
        const classificationModel = await tf.loadGraphModel(`classification_web_model/resnet/model.json`);

        setDetectionModel({
          net: detectionModel,
          inputShape: detectionModel.inputs[0].shape,
        });

        setClassificationModel(classificationModel); // Set the classification model
      } catch (error) {
        console.error("Error loading models", error);
      } finally {
        setTimeout(() => setLoading({ loading: true, progress: 75 }), 1000);
        setTimeout(() => setLoading({ loading: true, progress: 100 }), 1500);
        setTimeout(() => setLoading({ loading: false, progress: 100 }), 2500);
      }
    };

    loadModel();

    // Return a cleanup function to dispose of models when the component unmounts
    return () => {
      if (previousDetectionModel) previousDetectionModel.dispose();
      if (previousClassificationModel) previousClassificationModel.dispose();
    };
  }, []);

  // Utility function to load an image from a file
  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (ctx) {
            // Set the canvas dimensions to 320x320
            canvas.width = 640;
            canvas.height = 480;

            // Draw the image onto the canvas, resizing it
            ctx.drawImage(img, 0, 0, 640, 480);

            // Create a new image element from the resized canvas
            const resizedImg = new Image();
            resizedImg.src = canvas.toDataURL(); // Convert canvas to image data URL

            resizedImg.onload = () => resolve(resizedImg);
            resizedImg.onerror = (err) => reject(err);
          } else {
            reject("Canvas context is not available.");
          }
        };

        img.onerror = (err) => reject(err);
      };

      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const processImage = async () => {
    setPrcessingStatus("pending_classification");

    const img = await loadImage(file);

    tf.engine().startScope(); // start scoping tf engine
    const [modelWidth, modelHeight] = detectionModel.inputShape.slice(1, 3);
    const [input, xRatio, yRatio] = preprocess(img, modelWidth, modelHeight);
    const res = detectionModel.net.execute(input);
    const transRes = res.transpose([0, 2, 1]); // transpose result [b, det, n] => [b, n, det]
    const boxes = tf.tidy(() => {
      const w = transRes.slice([0, 0, 2], [-1, -1, 1]); // get width
      const h = transRes.slice([0, 0, 3], [-1, -1, 1]); // get height
      const x1 = tf.sub(transRes.slice([0, 0, 0], [-1, -1, 1]), tf.div(w, 2)); // x1
      const y1 = tf.sub(transRes.slice([0, 0, 1], [-1, -1, 1]), tf.div(h, 2)); // y1
      return tf
        .concat(
          [
            y1,
            x1,
            tf.add(y1, h), //y2
            tf.add(x1, w), //x2
          ],
          2
        )
        .squeeze();
    });

    const [scores, classes] = tf.tidy(() => {
      // Slicing to get the class scores correctly
      const rawScores = transRes.slice([0, 0, 4], [-1, -1, 1]); // Only get the class score
      return [rawScores.squeeze(0).max(1), rawScores.squeeze(0).argMax(1)];
    });

    const nms = await tf.image.nonMaxSuppressionAsync(boxes, scores, 500, 0.45, 0.2); // NMS to filter boxes
    const boxes_data = boxes.gather(nms, 0).dataSync();
    let [y1, x1, y2, x2] = boxes_data.slice(0, 4);
    x1 *= xRatio;
    x2 *= xRatio;
    y1 *= yRatio;
    y2 *= yRatio;
    const width = x2 - x1;
    const height = y2 - y1;

    const { inputTensor, dataUrl } = CropImage(img, x1, y1, width, height);

    cropRef.current.src = dataUrl;

    // Load and predict using the model
    const model = await tf.loadGraphModel("classification_web_model/resnet/model.json");

    // Get the predictions from the model
    const predictions = model.predict(inputTensor) as tf.Tensor;

    // Apply softmax to normalize predictions to probabilities between 0 and 1
    const normalizedPredictions = tf.softmax(predictions);

    // Get the predicted index (the class with the highest probability)
    const predictedIndex = normalizedPredictions.argMax(-1).dataSync()[0];

    // Optionally, you can get the actual probabilities for each class
    const probabilities = normalizedPredictions.dataSync();

    const confidence = probabilities[predictedIndex];

    console.log("Normalized Predictions (Probabilities):", probabilities[predictedIndex]);

    console.log("Predicted Class Index:", class_mapping[predictedIndex]);

    classRef.current.innerHTML = class_mapping[predictedIndex];
    confidenceRef.current.innerHTML = (confidence * 100).toFixed(2) + "%";
  };

  const startProcessing = () => {
    setPrcessingStatus("pending_detection");
    processImage();
  };

  useEffect(() => {
    if (file) {
      startProcessing();
    }
  }, [file]);

  const handleBack = (flag: any = true) => {
    // resetFile();
    flag && setOption(null);
    setPrcessingStatus("not_ready");
  };

  if (option === null) {
    return <ChooseOption setOption={setOption} />;
  }

  if (option === "choose_image") {
    if (prcessingStatus === "not_ready") {
      return (
        <Box p={4} height={1}>
          <Button onClick={handleBack}>Go Back</Button>
          <Stack height={1} justifyContent={"center"}>
            <Container>
              <Box pb={4} maxWidth={850} margin={"auto"}>
                <UploadBox file={file} onDrop={handleDrop} />
              </Box>
              <Collapse in={!!file}>
                <Stack alignItems={"center"}>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    endIcon={<SVG.image />}
                    onClick={startProcessing}
                  >
                    Detect and Classify Image
                  </Button>
                </Stack>
              </Collapse>
            </Container>
          </Stack>
        </Box>
      );
    }
    return (
      <Stack py={4} height={1} width={1} alignItems={"start"}>
        <Stack direction={"row"} width={1} px={4} pb={4} alignItems={"center"} justifyContent={"space-between"}>
          <Button color="primary" onClick={() => handleBack(false)} endIcon={<SVG.image />}>
            Try another
          </Button>
        </Stack>
        <Divider sx={{ width: 1 }} />
        <Stack
          flex={1}
          width={1}
          maxHeight={50}
          direction={"row"}
          justifyContent={"center"}
          divider={<Divider orientation="vertical" />}
        >
          <Stack justifyContent={"center"} alignItems={"center"} flex={1}>
            Source
          </Stack>
          <Stack justifyContent={"center"} alignItems={"center"} flex={1}>
            Detect & Crop
          </Stack>
          <Stack justifyContent={"center"} alignItems={"center"} flex={1}>
            Classify the image
          </Stack>
        </Stack>
        <Divider sx={{ width: 1 }} />
        <Stack
          direction={"row"}
          width={1}
          flex={1}
          justifyContent={"center"}
          divider={<Divider orientation="vertical" />}
        >
          <Box flex={1} sx={{ display: "grid", placeItems: "center" }}>
            <UploadBox sx={{ width: 0.85 }} file={file} onDrop={handleDrop} />
          </Box>
          <Stack flex={1}>
            <Box flex={1} sx={{ display: "grid", placeItems: "center" }}>
              <Box
                ref={cropRef}
                borderRadius={2}
                component={"img"}
                sx={{ objectFit: "contain", flex: 1, maxHeight: "60vh", width: 0.75 }}
              />
            </Box>
          </Stack>

          <Stack flex={1}>
            <Stack px={4} gap={2} flex={1} sx={{ justifyContent: "center", alignItems: "center" }}>
              <Stack direction={"row"} gap={2}>
                <Typography sx={{ fontSize: 36, fontWeight: "bold", textAlign: "center" }}>Pred Class : </Typography>
                <Typography ref={classRef} sx={{ fontSize: 36, fontWeight: "bold", textAlign: "center" }}></Typography>
              </Stack>

              <Stack direction={"row"} gap={2}>
                <Typography sx={{ fontSize: 36, fontWeight: "bold", textAlign: "center" }}>Confidence :</Typography>
                <Typography
                  ref={confidenceRef}
                  sx={{ fontSize: 36, fontWeight: "bold", textAlign: "center" }}
                ></Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Divider sx={{ width: 1 }} />
      </Stack>
    );
  }

  if (option === "take_image") {
    return (
      <Box p={4} height={1}>
        <Button onClick={handleBack}>Go Back</Button>
      </Box>
    );
  }
};

export default ImageView;
