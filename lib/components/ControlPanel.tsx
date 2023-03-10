import { useState } from "react";
import { useLoaders } from "../hooks/useLoaders";
import { usePredictions } from "../hooks/usePredictions";
import { useRenderer } from "../hooks/useRenderer";
import { FaceMeshRefs } from "../types/face-mesh";

const ControlPanel = ({ faceMeshRefs }: { faceMeshRefs: FaceMeshRefs }) => {
  const [mode, setMode] = useState("mesh");
  const [colors, setColors] = useState({
    eye: "rgba(75, 58, 38, 0.7)",
    lip: "rgba(220, 52, 19, 0.4)",
  });
  const onClickSelectColors = (selection: any) => {
    setColors((prev) => ({
      ...prev,
      ...selection,
    }));
  };

  const { predict, updatePredictions } = usePredictions(faceMeshRefs);
  const { loadCameraSetCanvas } = useLoaders(faceMeshRefs, predict);

  useRenderer(
    faceMeshRefs,
    updatePredictions,
    loadCameraSetCanvas,
    mode,
    colors
  );

  return (
    <div className="selection-panel">
      <div className="mode-selection">
        <button onClick={() => setMode("mesh")}>Mesh</button>
        <button onClick={() => setMode("beauty")}>Beauty</button>
      </div>
      <div className="color-picker">
        <div className="eye-shadow-color-picker">
          <div className="picker-label">Pick Eye Shadow Color</div>
          <div
            className="color-item black"
            onClick={() =>
              onClickSelectColors({ eye: "rgba(75, 58, 38, 0.7)" })
            }
          ></div>
          {/* #4b3a26 */}
          <div
            className="color-item violet"
            onClick={() =>
              onClickSelectColors({ eye: "rgba(130, 129, 187, 0.7)" })
            }
          ></div>
          {/* #8281bb */}
          <div
            className="color-item blue"
            onClick={() =>
              onClickSelectColors({ eye: "rgba(41, 75, 108, 0.7)" })
            }
          ></div>
          {/* #294a6c */}
        </div>
        <div className="lipstick-color-picker">
          <div className="picker-label">Pick Lipstick Color</div>
          <div
            className="color-item lip-red"
            onClick={() =>
              onClickSelectColors({ lip: "rgba(220, 52, 19, 0.4)" })
            }
          ></div>
          {/* #dc3513 red*/}
          <div
            className="color-item lip-blue"
            onClick={() =>
              onClickSelectColors({ lip: "rgba(28, 58, 65, 0.4)" })
            }
          ></div>
          {/* #1c3a41 */}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
