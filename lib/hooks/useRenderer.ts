import { useCallback, useEffect } from "react";

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
  updatePredictions: (predictions: Face[]) => void,
  loadCameraSetCanvas: () => void
) => {
  const { requestAF, contextRef, canvasRef, modelRef, videoRef } = faceMeshRefs;

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
  }, [requestAF, modelRef, canvasRef, contextRef, videoRef, updatePredictions]);

  useEffect(() => {
    const setBackend = async () => {
      const result = await tf.setBackend("wasm");
      if (result) {
        loadCameraSetCanvas();
        requestAF.current = requestAnimationFrame(render);
        return () => {
          // TODO: Destroy camera on unmount
          requestAF.current && cancelAnimationFrame(requestAF.current);
        };
      }
    };
    setBackend();
  }, [render, loadCameraSetCanvas, requestAF]);
};
