import { TRIANGULATION } from "../constants/triangulations";

export const drawTriangulations = (
  canvasContext: CanvasRenderingContext2D,
  positions: [number, number, number][]
) => {
  for (let i = 0; i < TRIANGULATION.length; i += 3) {
    const a = TRIANGULATION[i];
    const b = TRIANGULATION[i + 1];
    const c = TRIANGULATION[i + 2];

    canvasContext.strokeStyle = "orange";
    canvasContext.lineWidth = 0.5;
    canvasContext.beginPath();
    canvasContext.moveTo(positions[a][0], positions[a][1]);
    canvasContext.lineTo(positions[b][0], positions[b][1]);
    canvasContext.lineTo(positions[c][0], positions[c][1]);
    canvasContext.lineTo(positions[a][0], positions[a][1]);
    canvasContext.closePath();
    canvasContext.stroke();
  }
};

export const drawPositionPoints = (
  canvasContext: CanvasRenderingContext2D,
  positions: [number, number, number][]
) => {
  for (let i = 0; i < positions.length; i++) {
    const x = positions[i][0];
    const y = positions[i][1];
    canvasContext.fillRect(x, y, 1, 1);
  }
};
