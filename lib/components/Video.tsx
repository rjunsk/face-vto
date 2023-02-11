import { memo } from "React";
import { FaceMeshRefs } from "../types/face-mesh";

const Video = ({ faceMeshRefs }: { faceMeshRefs: FaceMeshRefs }) => (
  <video muted ref={faceMeshRefs.videoRef}></video>
);

export default memo(Video);
