import { memo } from "react";
import { FaceMeshRefs } from "../types/face-mesh";

const Canvas = ({ faceMeshRefs }: { faceMeshRefs: FaceMeshRefs }) => (
  <canvas ref={faceMeshRefs.canvasRef}></canvas>
);

export default memo(Canvas);
