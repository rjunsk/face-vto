import { useCallback, useRef } from "react";
import { FaceMesh, AnnotatedPrediction } from "@tensorflow-models/facemesh";

import {
  drawEyeLiner,
  drawEyeShadows,
  drawLeftEyeShadow,
  drawLips,
  drawPositionPoints,
  drawRealisticLeftEyeShadow,
  drawTriangulations,
  smoothEyeShadow,
} from "../utils/canvas";

import { FaceMeshRefs } from "../types/face-mesh";

export const usePredictions = (faceMeshRefs: FaceMeshRefs) => {
  const { positionsRef, contextRef, modelRef } = faceMeshRefs;
  const printRef = useRef(0);

  const updatePredictions = useCallback(
    (predictions: AnnotatedPrediction[]) => {
      if (printRef.current === 0) {
        console.log(predictions);
        printRef.current = 1;
      }
      const positions = predictions[0].scaledMesh as unknown as [
        number,
        number,
        number
      ][];
      positionsRef.current = positions;

      // drawTriangulations(
      //   contextRef.current as CanvasRenderingContext2D,
      //   positions
      // );
      // drawPositionPoints(
      //   contextRef.current as CanvasRenderingContext2D,
      //   positions
      // );
      // drawEyeShadows(
      //   contextRef.current as CanvasRenderingContext2D,
      //   predictions
      // );
      // drawLeftEyeShadow(
      //   contextRef.current as CanvasRenderingContext2D,
      //   predictions
      // );
      // drawRealisticLeftEyeShadow(
      //   contextRef.current as CanvasRenderingContext2D,
      //   predictions
      // );
      smoothEyeShadow(
        contextRef.current as CanvasRenderingContext2D,
        predictions
      );
      drawLips(contextRef.current as CanvasRenderingContext2D, predictions);
      // drawEyeLiner(contextRef.current as CanvasRenderingContext2D, predictions);
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
