import { useCallback, useEffect, useRef } from "react";

import * as tf from "@tensorflow/tfjs";
import { setWasmPaths } from "@tensorflow/tfjs-backend-wasm";

import { FaceMeshRefs } from "../types/face-mesh";
import { Face } from "@tensorflow-models/face-landmarks-detection";

setWasmPaths({
  "tfjs-backend-wasm.wasm": "/tfwasm/tfjs-backend-wasm.wasm",
  "tfjs-backend-wasm-simd.wasm": "/tfwasm/tfjs-backend-wasm-simd.wasm",
  "tfjs-backend-wasm-threaded-simd.wasm":
    "/tfwasm/tfjs-backend-wasm-threaded-simd.wasm",
});

export const useRenderer = (
  faceMeshRefs: FaceMeshRefs,
  updatePredictions: (predictions: Face[], mode: string, colors: any) => void,
  loadCameraSetCanvas: () => void,
  mode: any,
  colors: any
) => {
  const { requestAF, contextRef, canvasRef, modelRef, videoRef } = faceMeshRefs;
  const isBackedSet = useRef(false);

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
        .then((predictions: Face[]) => {
          if (predictions) {
            updatePredictions(predictions, mode, colors);
          }
        })
        .catch((e) => {
          console.log(e, requestAF.current);
        });
    }
  }, [
    requestAF,
    modelRef,
    canvasRef,
    contextRef,
    videoRef,
    updatePredictions,
    mode,
    colors,
  ]);

  useEffect(() => {
    loadCameraSetCanvas();
  }, []);

  useEffect(() => {
    const setBackend = async () => {
      const result = await tf.setBackend("wasm");
      if (result) {
        isBackedSet.current = true;
        render();
      }
    };
    if (!isBackedSet.current) {
      setBackend();
    } else {
      render();
    }
    return () => {
      requestAF.current && cancelAnimationFrame(requestAF.current);
    };
  }, [render, isBackedSet.current]);
};
