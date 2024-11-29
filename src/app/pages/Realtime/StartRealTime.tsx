import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Loading from "./Loading";
import { Box, Divider, Fab, Grid, Stack, Typography } from "@mui/material";
import { detectVideo } from "../../utils/detect";
import CustomSelect from "../../components/select/custom-select";
import { SVG } from "../../components/icon/Image";

const StartRealTime = () => {
  const [memoryInfo, setMemoryInfo] = useState<any>(tf.memory());
  const [cameraFacingMode, setCameraFacingMode] = useState("environment");
  const [loading, setLoading] = useState({ loading: true, progress: 10 });
  const [detectionModel, setDetectionModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  });
  const [classificationModel, setClassificationModel] = useState<tf.GraphModel | null>(null);

  useEffect(() => {
    const interval_id = setInterval(() => setMemoryInfo(tf.memory()), 2000);
    return () => clearInterval(interval_id);
  }, [loading]);

  const cameraRef: any = useRef(null);
  const canvasRef: any = useRef(null);

  useEffect(() => {
    tf.ready()
      .then(async () => {
        const detectionModel: any = await tf.loadGraphModel("detection_web_model/model.json"); // Load detection model
        const classificationModel: any = await tf.loadGraphModel("classification_web_model/mobile_net/model.json"); // Load classification model

        setLoading({ loading: true, progress: 50 });

        // Warmup detection model
        const dummyInput = tf.ones(detectionModel.inputs[0].shape);
        const warmupResults = detectionModel.execute(dummyInput);
        setDetectionModel({
          net: detectionModel,
          inputShape: detectionModel.inputs[0].shape,
        });

        setClassificationModel(classificationModel); // Set classification model
        tf.dispose([warmupResults, dummyInput]); // Clean up memory
      })
      .finally(() => {
        setTimeout(() => setLoading({ loading: true, progress: 75 }), 1000);
        setTimeout(() => setLoading({ loading: true, progress: 100 }), 1500);
        setTimeout(() => setLoading({ loading: false, progress: 100 }), 2500);
      });
  }, []);

  useEffect(() => {
    let stream: any = null;
    const openCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: cameraFacingMode },
        });
        if (cameraRef.current) {
          cameraRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera: ", err);
      }
    };

    if (!loading.loading && cameraRef.current) {
      openCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track: any) => track.stop());
      }
    };
  }, [loading, cameraFacingMode]);

  if (loading.loading) {
    return <Loading loading={loading} />;
  }

  const convertMemory = (bytes: string | number | undefined) => {
    if (!bytes) return "0 B";
    bytes = typeof bytes === "string" ? parseInt(bytes) : bytes;

    if (bytes > 1048576) return `${(bytes / 1048576).toFixed(2)} MB`;
    if (bytes > 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${bytes} B`;
  };

  return (
    <Stack py={2} gap={2}>
      <Stack px={2} gap={4} direction={{ md: "row" }}>
        <Grid container color={"grey.700"} maxWidth={450}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" fontWeight={500}>
              Number of tensors : <b>{memoryInfo.numTensors}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" fontWeight={500}>
              Total Memory Usages : <b>{convertMemory(memoryInfo.numBytes)}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" fontWeight={500}>
              Memory Usages (GPU) : <b>{convertMemory(memoryInfo?.numBytesInGPU)}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" fontWeight={500}>
              Memory Allocated (GPU) : <b>{convertMemory(memoryInfo?.numBytesInGPUAllocated)}</b>
            </Typography>
          </Grid>
        </Grid>
        <Stack flex={1} direction={{ sm: "row" }} gap={4} justifyContent={"end"}>
          <CustomSelect
            label="Choose Detection model"
            defaultValue={"yolo"}
            variant="outlined"
            lists={[{ label: "YOLO", value: "yolo" }]}
          />
          <CustomSelect
            defaultValue={"resnet50"}
            label="Choose Classification model"
            variant="outlined"
            lists={[
              { label: "Resnet-50", value: "resnet50" },
              { label: "VGG-19", value: "vgg19" },
              { label: "DenseNet-169", value: "densenet169" },
              { label: "EfficientNet-B7", value: "efficientnet_b7" },
              { label: "MobileNet-V3", value: "mobilenet_v3_large" },
            ]}
          />
        </Stack>
      </Stack>
      <Divider />

      <Stack px={{ xs: 1, sm: 4 }} gap={1}>
        <Typography variant="h6">Detecting Hands</Typography>
        <Box
          position={"relative"}
          display={"inline-block"}
          maxWidth={{ xs: 1, sm: 640 }}
          maxHeight={480}
          overflow={"hidden"}
        >
          <Box
            muted
            autoPlay
            minWidth={{ xs: 1, sm: "auto" }}
            maxWidth={{ xs: 1, sm: 640 }}
            maxHeight={480}
            ref={cameraRef}
            component={"video"}
            borderRadius={2}
            onPlay={() => detectVideo(cameraRef.current, detectionModel, classificationModel, canvasRef.current)}
          />
          <canvas
            className="realtimeCanvas"
            width={detectionModel.inputShape[1]}
            height={detectionModel.inputShape[2]}
            ref={canvasRef}
          />
        </Box>
      </Stack>

      <Fab
        color="primary"
        sx={{ position: "absolute", right: 20, bottom: 20 }}
        onClick={() => setCameraFacingMode((prev) => (prev === "environment" ? "user" : "environment"))}
      >
        <SVG.cameraRotate size={28} />
      </Fab>
    </Stack>
  );
};

export default StartRealTime;
