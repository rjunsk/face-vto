import { useSetupRefs } from "../hooks/useSetupRefs";

import ControlPanel from "./ControlPanel";

export default function Home() {
  const faceMeshRefs = useSetupRefs();

  return (
    <div className="face-mesh-app">
      <div className="face-mesh-container">
        <video muted ref={faceMeshRefs.videoRef}></video>
        <canvas ref={faceMeshRefs.canvasRef}></canvas>
      </div>
      <ControlPanel faceMeshRefs={faceMeshRefs} />
    </div>
  );
}
