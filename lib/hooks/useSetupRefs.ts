import { useRef } from "react";

import { FaceMeshRefs } from "../types/face-mesh";

export const useSetupRefs = (): FaceMeshRefs => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const modelRef = useRef(null);
  const positionsRef = useRef([]);
  const requestAF = useRef(null);

  return {
    videoRef,
    canvasRef,
    contextRef,
    modelRef,
    positionsRef,
    requestAF,
  };
};
