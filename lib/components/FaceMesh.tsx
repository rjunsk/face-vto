import { useSetupRefs } from "../hooks/useSetupRefs";
import { useLoaders } from "../hooks/useLoaders";
import { usePredictions } from "../hooks/usePredictions";
import { useRenderer } from "../hooks/useRenderer";

export default function Home() {
  const faceMeshRefs = useSetupRefs();
  const { predict, updatePredictions } = usePredictions(faceMeshRefs);
  const { loadCameraSetCanvas } = useLoaders(faceMeshRefs, predict);

  useRenderer(faceMeshRefs, updatePredictions, loadCameraSetCanvas);

  return (
    <div className="face-mesh-app">
      <div className="face-mesh-container">
        <video muted ref={faceMeshRefs.videoRef}></video>
        <canvas ref={faceMeshRefs.canvasRef}></canvas>
      </div>
    </div>
  );
}
