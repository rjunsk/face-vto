import { MutableRefObject } from "react";
import {
  FaceLandmarksDetector,
  Keypoint,
} from "@tensorflow-models/face-landmarks-detection";

export type FaceMeshRefs = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  contextRef: MutableRefObject<CanvasRenderingContext2D | null>;
  modelRef: MutableRefObject<FaceLandmarksDetector | null>;
  positionsRef: MutableRefObject<Keypoint[]>;
  requestAF: MutableRefObject<number | null>;
};
