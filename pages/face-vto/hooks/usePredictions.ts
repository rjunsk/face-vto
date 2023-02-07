import { useCallback } from "react";
import { FaceMesh, AnnotatedPrediction } from "@tensorflow-models/facemesh";

import { drawPositionPoints, drawTriangulations } from "../utils/canvas";

import { FaceMeshRefs } from "../types/face-mesh";

export const usePredictions = (faceMeshRefs: FaceMeshRefs) => {
  const { positionsRef, contextRef, modelRef } = faceMeshRefs;

  const updatePredictions = useCallback(
    (predictions: AnnotatedPrediction[]) => {
      const positions = predictions[0].scaledMesh as unknown as [
        number,
        number,
        number
      ][];
      positionsRef.current = positions;

      drawTriangulations(
        contextRef.current as CanvasRenderingContext2D,
        positions
      );
      drawPositionPoints(
        contextRef.current as CanvasRenderingContext2D,
        positions
      );
    },
    [contextRef, positionsRef]
  );

  const predict = useCallback(
    (model: FaceMesh) => {
      if (model && !modelRef.current) {
        modelRef.current = model;
      }
    },
    [modelRef]
  );

  return {
    predict,
    updatePredictions,
  };
};
