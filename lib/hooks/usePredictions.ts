import { useCallback, useRef } from "react";

import {
  drawLips,
  drawPositionPoints,
  drawTriangulations,
  smoothEyeShadow,
} from "../utils/canvas";

import { FaceMeshRefs } from "../types/face-mesh";
import {
  Face,
  FaceLandmarksDetector,
} from "@tensorflow-models/face-landmarks-detection";

export const usePredictions = (faceMeshRefs: FaceMeshRefs) => {
  const { contextRef, modelRef, videoRef } = faceMeshRefs;
  const printRef = useRef(0);

  const updatePredictions = useCallback(
    (predictions: Face[], mode: string, selectedColors: any) => {
      if (printRef.current === 0) {
        console.log(predictions);
        printRef.current = 1;
      }

      if (mode === "mesh") {
        drawTriangulations(
          contextRef.current as CanvasRenderingContext2D,
          predictions
        );
        drawPositionPoints(
          contextRef.current as CanvasRenderingContext2D,
          predictions
        );
      } else if (mode === "beauty") {
        smoothEyeShadow(
          contextRef.current as CanvasRenderingContext2D,
          predictions,
          selectedColors
        );
        drawLips(
          contextRef.current as CanvasRenderingContext2D,
          predictions,
          selectedColors
        );
      }
    },
    [contextRef]
  );

  const predict = useCallback(
    (detector: FaceLandmarksDetector) => {
      if (detector && !modelRef.current) {
        modelRef.current = detector;
      }
    },
    [modelRef]
  );

  return {
    predict,
    updatePredictions,
  };
};
