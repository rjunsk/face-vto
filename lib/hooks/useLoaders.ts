import { useCallback } from "react";

import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

import { FaceMeshRefs } from "../types/face-mesh";

const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
const detectorConfig = {
  runtime: "tfjs",
} as faceLandmarksDetection.MediaPipeFaceMeshTfjsModelConfig;

export const useLoaders = (
  faceMeshRefs: FaceMeshRefs,
  predict: (model: faceLandmarksDetection.FaceLandmarksDetector) => void
) => {
  const { canvasRef, videoRef, contextRef } = faceMeshRefs;

  const loadModel = useCallback(() => {
    // detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
    faceLandmarksDetection.createDetector(model, detectorConfig).then(predict);
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
