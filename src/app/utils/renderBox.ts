import { alpha } from "@mui/material";
import * as tf from "@tensorflow/tfjs";

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

const visualizeCroppedImage = (croppedImage, previewRef) => {
  const ctx = previewRef.getContext("2d");

  if (croppedImage instanceof ImageData) {
    // Resize the canvas to match the ImageData dimensions
    previewRef.width = croppedImage.width;
    previewRef.height = croppedImage.height;

    // Clear the canvas and draw the ImageData
    ctx.clearRect(0, 0, previewRef.width, previewRef.height);
    ctx.putImageData(croppedImage, 0, 0);
  } else {
    console.error("Unsupported croppedImage type. Must be ImageData.");
  }
};

export const CropImage = (
  source: any,
  x1: number,
  y1: number,
  width: number,
  height: number,
  format: boolean = true
) => {
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  tempCanvas.width = width;
  tempCanvas.height = height;

  tempCtx.drawImage(
    source, // Source image/video element
    format ? x1 * 2 : x1, // x1: starting x of the crop
    format ? y1 * 1.5 : y1, // y1: starting y of the crop
    format ? width * 2 : width, // width: crop width
    format ? height * 1.5 : height, // height: crop height
    0, // destination x in temporary canvas
    0, // destination y in temporary canvas
    width, // destination width in temporary canvas
    height // destination height in temporary canvas
  );

  const cropped_img = tempCtx.getImageData(0, 0, width, height);

  const inputTensor = tf.browser
    .fromPixels(cropped_img)
    .resizeBilinear([224, 224]) // Resize to model input dimensions
    .toFloat()
    .div(255.0) // Normalize pixel values to 0–1
    .sub(tf.tensor([0.485, 0.456, 0.406])) // Subtract ImageNet mean
    .div(tf.tensor([0.229, 0.224, 0.225])) // Divide by ImageNet std
    .expandDims(0) // Add batch dimension
    .transpose([0, 3, 1, 2]);

  const dataUrl = tempCanvas.toDataURL();

  return { inputTensor, dataUrl };
};

/**
 * Render prediction boxes
 * @param {HTMLCanvasElement} canvasRef canvas tag reference
 * @param {Array} boxes_data boxes array
 * @param {Array} scores_data scores array
 * @param {Array} classes_data class array
 * @param {Array[Number]} ratios boxes ratio [xRatio, yRatio]
 */
export const renderBoxes = async (
  source,
  canvasRef,
  previewRef,
  boxes_data,
  scores_data,
  classes_data,
  ratios,
  classificationModel
) => {
  const ctx = canvasRef.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clean canvas

  const color = "#FF3838";

  // font configs
  const font = `${Math.max(Math.round(Math.max(ctx.canvas.width, ctx.canvas.height) / 40), 14)}px Arial`;
  ctx.font = font;
  ctx.textBaseline = "top";

  for (let i = 0; i < scores_data.length; ++i) {
    // filter based on class threshold
    const score = parseFloat((scores_data[i] * 100).toFixed(1));

    if (score > 80) {
      let [y1, x1, y2, x2] = boxes_data.slice(i * 4, (i + 1) * 4);
      x1 *= ratios[0];
      x2 *= ratios[0];
      y1 *= ratios[1];
      y2 *= ratios[1];
      const width = x2 - x1;
      const height = y2 - y1;

      // visualizeCroppedImage(croppedImage, previewRef);

      const { inputTensor } = CropImage(source, x1, y1, width, height);

      const result = classificationModel.predict(inputTensor);
      const predicted_index = result.as1D().argMax().dataSync()[0];

      const pred_class = class_mapping[predicted_index];

      // draw box.
      ctx.fillStyle = alpha(color, 0.2);
      ctx.fillRect(x1, y1, width, height);

      // draw border box.
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(Math.min(ctx.canvas.width, ctx.canvas.height) / 200, 2.5);
      ctx.strokeRect(x1, y1, width, height);

      // Draw the label background.
      ctx.fillStyle = color;
      const textWidth = ctx.measureText(pred_class).width;
      const textHeight = parseInt(font, 10); // base 10
      const yText = y1 - (textHeight + ctx.lineWidth);
      ctx.fillRect(
        x1 - 1,
        yText < 0 ? 0 : yText, // handle overflow label box
        textWidth + ctx.lineWidth,
        textHeight + ctx.lineWidth
      );

      // Draw labels
      ctx.fillStyle = "#ffffff";
      ctx.fillText(pred_class, x1 - 1, yText < 0 ? 0 : yText);
    }
  }
};
