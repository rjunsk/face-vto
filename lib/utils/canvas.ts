import { Face } from "@tensorflow-models/face-landmarks-detection";
import { AnnotatedPrediction } from "@tensorflow-models/facemesh";
import { TRIANGULATION } from "../constants/triangulations";

export const drawTriangulations = (
  contextRef: CanvasRenderingContext2D,
  positions: Face[]
) => {
  for (let i = 0; i < TRIANGULATION.length; i += 3) {
    const a = TRIANGULATION[i];
    const b = TRIANGULATION[i + 1];
    const c = TRIANGULATION[i + 2];

    contextRef.shadowColor = "none";
    contextRef.shadowBlur = 0;
    contextRef.strokeStyle = "orange";
    contextRef.lineWidth = 0.5;
    contextRef.beginPath();
    contextRef.moveTo(positions[a].x, positions[a].y);
    contextRef.lineTo(positions[b].x, positions[b].y);
    contextRef.lineTo(positions[c].x, positions[c].y);
    // contextRef.lineTo(positions[a][0], positions[a][1]);
    contextRef.closePath();
    contextRef.stroke();
  }
};

export const drawPositionPoints = (
  contextRef: CanvasRenderingContext2D,
  positions: Face[]
) => {
  for (let i = 0; i < positions.length; i++) {
    const x = positions[i].x;
    const y = positions[i].y;
    contextRef.fillStyle = "black";
    contextRef.fillRect(x, y, 1, 1);
  }
};

export const drawEyeShadows = (
  contextRef: CanvasRenderingContext2D,
  predictions: AnnotatedPrediction[]
) => {
  if ("annotations" in predictions[0]) {
    const annotations = predictions[0].annotations || {};
    const eyeShadowKeys = [
      // "leftEyeUpper0",
      // "leftEyeUpper1",
      "leftEyeUpper2",
      "leftEyebrowLower",
      // "rightEyeUpper0",
      // "rightEyeUpper1",
      "rightEyeUpper2",
      "rightEyebrowLower",
    ];

    eyeShadowKeys.forEach((item) => {
      const positions = annotations[item];
      contextRef.fillStyle = "rgb(89, 72, 102, 1)";
      contextRef.beginPath();
      contextRef.moveTo(positions[0][0], positions[0][1]);
      for (let i = 1; i < positions.length; i++) {
        contextRef.lineTo(positions[i][0], positions[i][1]);
      }
      contextRef.closePath();
      contextRef.fill();
    });
  }
};

export const drawLeftEyeShadow = (
  contextRef: CanvasRenderingContext2D,
  predictions: AnnotatedPrediction[]
) => {
  const positions = predictions[0].scaledMesh as [number, number, number][];
  const leftEyeMeshPoints = [
    33, 246, 161, 160, 159, 158, 157, 173, 133, 243, 190, 56, 28, 27, 29, 30,
    247, 130,
  ];

  contextRef.lineJoin = "round";
  contextRef.beginPath();

  let gradient = contextRef.createLinearGradient(
    positions[46][0],
    positions[46][1],
    positions[133][0],
    positions[133][1]
  );
  gradient.addColorStop(0, "rgba(90, 47, 117, 0.7)");
  gradient.addColorStop(0.5, "rgba(90, 47, 117, 0.7)");
  gradient.addColorStop(1, "rgba(125, 65, 163, 0.7)");
  contextRef.fillStyle = gradient;

  contextRef.moveTo(
    positions[leftEyeMeshPoints[0]][0],
    positions[leftEyeMeshPoints[0]][1]
  );
  for (let i = 1; i < leftEyeMeshPoints.length; i++) {
    contextRef.lineTo(
      positions[leftEyeMeshPoints[i]][0],
      positions[leftEyeMeshPoints[i]][1]
    );
  }
  contextRef.closePath();
  contextRef.fill();

  gradient = contextRef.createLinearGradient(
    positions[46][0],
    positions[46][1],
    positions[133][0],
    positions[133][1]
  );
  gradient.addColorStop(0, "rgba(160, 99, 199, 0.4)");
  gradient.addColorStop(0.5, "rgba(160, 99, 199, 0.4)");
  gradient.addColorStop(1, "rgba(182, 120, 222, 0.4)");
  contextRef.fillStyle = gradient;
  const leftEyeMeshPoints1 = [
    130, 247, 30, 29, 27, 28, 56, 190, 133, 189, 221, 222, 223, 224, 225, 113,
    130,
  ];
  contextRef.beginPath();
  contextRef.moveTo(
    positions[leftEyeMeshPoints1[0]][0],
    positions[leftEyeMeshPoints1[0]][1]
  );
  for (let i = 1; i < leftEyeMeshPoints1.length; i++) {
    contextRef.lineTo(
      positions[leftEyeMeshPoints1[i]][0],
      positions[leftEyeMeshPoints1[i]][1]
    );
  }
  contextRef.closePath();
  contextRef.fill();

  gradient.addColorStop(0, "rgba(160, 99, 199, 0.8)");
  gradient.addColorStop(0.5, "rgba(160, 99, 199, 0.4)");
  gradient.addColorStop(1, "rgba(251, 247, 252, 0.2)");
  contextRef.fillStyle = gradient;
  const leftEyeMeshPoints2 = [223, 46, 124, 130];
  contextRef.beginPath();
  contextRef.moveTo(
    positions[leftEyeMeshPoints2[0]][0],
    positions[leftEyeMeshPoints2[0]][1]
  );
  for (let i = 1; i < leftEyeMeshPoints2.length; i++) {
    contextRef.lineTo(
      positions[leftEyeMeshPoints2[i]][0],
      positions[leftEyeMeshPoints2[i]][1]
    );
  }
  contextRef.closePath();
  contextRef.fill();
};

export const drawRealisticLeftEyeShadow = (
  contextRef: CanvasRenderingContext2D,
  predictions: AnnotatedPrediction[]
) => {
  const positions = predictions[0].scaledMesh as [number, number, number][];
  const layer1 = [113, 225, 29, 159, 160, 161, 246];
  const layer2 = [
    246, 33, 113, 124, 46, 223, 222, 221, 189, 243, 133, 173, 157, 158, 159, 29,
    30, 247,
  ];

  let gradient = contextRef.createLinearGradient(
    positions[246][0],
    positions[246][1],
    positions[113][0],
    positions[113][1]
  );
  gradient.addColorStop(0, "rgba(90, 47, 117, 0.9)");
  gradient.addColorStop(0.2, "rgba(90, 47, 117, 0.8)");
  gradient.addColorStop(1, "rgba(125, 65, 163, 0.7)");
  contextRef.fillStyle = gradient;
  contextRef.lineJoin = "round";
  // Layer 1
  contextRef.beginPath();
  contextRef.moveTo(positions[layer1[0]][0], positions[layer1[0]][1]);
  for (let i = 1; i < layer1.length; i++) {
    contextRef.lineTo(positions[layer1[i]][0], positions[layer1[i]][1]);
  }
  contextRef.closePath();
  contextRef.fill();
  // Layer 2
  gradient = contextRef.createLinearGradient(
    positions[145][0],
    positions[145][1],
    positions[52][0],
    positions[52][1]
  );
  gradient.addColorStop(0, "rgba(160, 99, 199, 0.5)");
  gradient.addColorStop(0.5, "rgba(160, 99, 199, 0.5)");
  gradient.addColorStop(1, "rgba(251, 247, 252, 0.1)");
  contextRef.fillStyle = gradient;
  contextRef.beginPath();
  contextRef.moveTo(positions[layer2[0]][0], positions[layer2[0]][1]);
  for (let i = 1; i < layer2.length; i++) {
    contextRef.lineTo(positions[layer2[i]][0], positions[layer2[i]][1]);
  }
  contextRef.closePath();
  contextRef.fill();
};

export const smoothEyeShadow = (
  contextRef: CanvasRenderingContext2D,
  predictions: Face[],
  selectedColors: any
) => {
  const positions = predictions[0].keypoints;
  const layer1 = [
    33, 246, 161, 160, 159, 158, 157, 173, 133, 243, 190, 223, 46, 124, 226,
    130,
  ];
  contextRef.beginPath();
  let gradient = contextRef.createRadialGradient(
    positions[30].x + 5,
    positions[30].y + 5,
    1,
    positions[30].x + 10,
    positions[30].y + 50,
    100
  );
  // Add three color stops
  gradient.addColorStop(0, selectedColors.eye);
  //   gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.3)");
  gradient.addColorStop(0.3, "transparent");
  contextRef.fillStyle = gradient;

  contextRef.moveTo(positions[layer1[0]].x, positions[layer1[0]].y);
  for (let i = 1; i < layer1.length; i++) {
    contextRef.lineTo(positions[layer1[i]].x, positions[layer1[i]].y);
  }
  contextRef.closePath();
  //   contextRef.shadowColor = "rgba(58, 31, 74, 0.7)";
  contextRef.shadowColor = "red";
  contextRef.shadowOffsetX = 0;
  contextRef.shadowOffsetY = 0;
  contextRef.shadowBlur = 50;
  contextRef.fill();
  //   contextRef.stroke();
  const layer2 = [
    263, 466, 388, 387, 386, 385, 384, 398, 362, 463, 414, 443, 276, 353, 446,
    359,
  ];
  contextRef.beginPath();
  gradient = contextRef.createRadialGradient(
    positions[260].x,
    positions[260].y + 5,
    1,
    positions[260].x + 10,
    positions[260].y + 50,
    100
  );
  // Add three color stops
  gradient.addColorStop(0, selectedColors.eye);
  //   gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.3)");
  gradient.addColorStop(0.3, "transparent");
  contextRef.fillStyle = gradient;
  contextRef.moveTo(positions[layer2[0]].x, positions[layer2[0]].y);
  for (let i = 1; i < layer2.length; i++) {
    contextRef.lineTo(positions[layer2[i]].x, positions[layer2[i]].y);
  }
  contextRef.closePath();
  contextRef.fill();
};

export const drawEyeLiner = (
  contextRef: CanvasRenderingContext2D,
  predictions: AnnotatedPrediction[]
) => {
  const positions = predictions[0].scaledMesh as [number, number, number][];
  const rightEye = [
    130, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163,
    7,
  ];
  const leftEye = [
    359, 466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390,
    249,
  ];

  [rightEye, leftEye].forEach((eye) => {
    const firstPoint = positions[eye[0]];
    contextRef.beginPath();
    contextRef.moveTo(firstPoint[0], firstPoint[1]);
    for (let i = 1; i < eye.length; i++) {
      contextRef.lineTo(positions[eye[i]][0], positions[eye[i]][1]);
    }
    contextRef.closePath();
    contextRef.stroke();
  });
};

export const drawLips = (
  contextRef: CanvasRenderingContext2D,
  predictions: Face[],
  selectedColors: any
) => {
  const positions = predictions[0].keypoints;
  const lowerLip = [
    61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 306, 308, 324, 318, 402,
    317, 14, 87, 178, 88, 95, 78, 62, 76,
  ];
  const upperLip = [
    61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 306, 308, 415, 310, 311,
    312, 13, 82, 81, 80, 191, 78, 62, 76,
  ];

  [lowerLip, upperLip].forEach((lip) => {
    const firstPoint = positions[lip[0]];
    contextRef.beginPath();
    contextRef.moveTo(firstPoint.x, firstPoint.y);
    for (let i = 1; i < lip.length; i++) {
      contextRef.lineTo(positions[lip[i]].x, positions[lip[i]].y);
    }
    contextRef.closePath();
    contextRef.fillStyle = selectedColors.lip;
    contextRef.fill();
  });
};
