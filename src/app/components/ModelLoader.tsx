import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const ModelLoader = () => {
  const [model, setModel] = useState<any>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadGraphModel("detection2/model.json");
        setModel(loadedModel);
        console.log("Model loaded successfully");
      } catch (error) {
        console.error("Error loading the model:", error);
      }
    };

    loadModel();
  }, []);

  return <div>{model ? <p>Model loaded!</p> : <p>Loading model...</p>}</div>;
};

export default ModelLoader;
