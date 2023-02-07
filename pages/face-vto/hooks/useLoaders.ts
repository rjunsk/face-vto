import { useCallback } from "react";

import * as facemesh from "@tensorflow-models/facemesh";

import { FaceMeshRefs } from "../types/face-mesh";

export const useLoaders = (
  faceMeshRefs: FaceMeshRefs,
  predict: (model: facemesh.FaceMesh) => void
) => {
  const { canvasRef, videoRef, contextRef } = faceMeshRefs;

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
  }, [loadModel, videoRef, canvasRef]);

  const loadStream = useCallback(
    (stream: MediaStream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = handleStreamLoad;
      }
    },
    [handleStreamLoad, videoRef]
  );

  const loadCameraSetCanvas = useCallback(() => {
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
  }, [contextRef, canvasRef, loadStream]);

  return { loadCameraSetCanvas };
};
