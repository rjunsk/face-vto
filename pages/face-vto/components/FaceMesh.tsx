import { useCallback, useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-wasm";
import * as facemesh from "@tensorflow-models/facemesh";

import { setWasmPaths } from "@tensorflow/tfjs-backend-wasm";

setWasmPaths({
  "tfjs-backend-wasm.wasm": "/tfwasm/tfjs-backend-wasm.wasm",
  "tfjs-backend-wasm-simd.wasm": "/tfwasm/tfjs-backend-wasm-simd.wasm",
  "tfjs-backend-wasm-threaded-simd.wasm":
    "/tfwasm/tfjs-backend-wasm-threaded-simd.wasm",
});

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  // const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const modelRef = useRef<facemesh.FaceMesh>();
  const positionsRef = useRef<[number, number, number][]>([]);
  const requestAF = useRef<number | null>(null);

  const updatePredictions = useCallback(
    (predictions: facemesh.AnnotatedPrediction[]) => {
      //   predict(modelRef.current as facemesh.FaceMesh);
      const positions = predictions[0].scaledMesh as unknown as [
        number,
        number,
        number
      ][];
      positionsRef.current = positions;
      //   const positions = positionsRef.current;
      for (let i = 0; i < positions.length; i++) {
        const x = positions[i][0];
        const y = positions[i][1];
        // if (context) {
        contextRef.current?.fillRect(x, y, 1, 1);
        // }
      }
    },
    []
  );

  const predict = useCallback(
    (model: facemesh.FaceMesh) => {
      if (model && !modelRef.current) {
        modelRef.current = model;
      }
    },
    [updatePredictions]
  );

  const loadModel = useCallback(() => {
    facemesh.load({ maxFaces: 1 }).then(predict);
  }, [predict]);

  const handleStreamLoad = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      videoRef.current.height = videoRef.current.videoHeight;
      videoRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      canvasRef.current.width = videoRef.current.videoWidth;
      videoRef.current.setAttribute("autoplay", "true");
      videoRef.current.setAttribute("muted", "true");
      videoRef.current.setAttribute("playsinline", "true");
      videoRef.current.play();
      loadModel();
    }
  }, [loadModel]);

  const loadStream = useCallback(
    (stream: MediaStream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = handleStreamLoad;
      }
    },
    [handleStreamLoad]
  );

  useEffect(() => {
    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(loadStream);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "black";
        contextRef.current = ctx;
      }
    }
  }, []);

  const render = useCallback(() => {
    requestAF.current = requestAnimationFrame(render);
    contextRef.current?.clearRect(
      0,
      0,
      canvasRef.current?.width as number,
      canvasRef.current?.height as number
    );
    if (modelRef.current && videoRef.current) {
      modelRef.current
        .estimateFaces(videoRef.current)
        .then(updatePredictions)
        .catch((e) => console.log(e));
    }
  }, []);

  useEffect(() => {
    const setBackend = async () => {
      const result = await tf.setBackend("wasm");
      console.log(result);
      if (result) {
        requestAF.current = requestAnimationFrame(render);
        return () => {
          requestAF.current && cancelAnimationFrame(requestAF.current);
        };
      }
    };
    setBackend();
  }, []);

  return (
    <>
      <video muted ref={videoRef}></video>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}
