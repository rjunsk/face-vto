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

export const usePredictions = (
  faceMeshRefs: FaceMeshRefs,
  mode = "beauty",
  selectedColors: any
) => {
  const { positionsRef, contextRef, modelRef } = faceMeshRefs;
  const printRef = useRef(0);

  const updatePredictions = useCallback(
    (predictions: Face[]) => {
      if (printRef.current === 0) {
        console.log(predictions);
        printRef.current = 1;
      }
      const positions = predictions[0].keypoints;
      positionsRef.current = positions;

      if (mode === "mesh") {
        drawTriangulations(
          contextRef.current as CanvasRenderingContext2D,
          positions
        );
        drawPositionPoints(
          contextRef.current as CanvasRenderingContext2D,
          positions
        );
      } else {
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
    [contextRef, positionsRef, mode, selectedColors]
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
