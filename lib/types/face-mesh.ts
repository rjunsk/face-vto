import { MutableRefObject } from "react";
import { FaceMesh } from "@tensorflow-models/facemesh";

export type FaceMeshRefs = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  contextRef: MutableRefObject<CanvasRenderingContext2D | null>;
  modelRef: MutableRefObject<FaceMesh | null>;
  positionsRef: MutableRefObject<[number, number, number][]>;
  requestAF: MutableRefObject<number | null>;
};
