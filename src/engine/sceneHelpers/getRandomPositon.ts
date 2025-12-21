export function getRandomPosition(
  gameWidth: number,
  gameHeight: number,
  config?: {
    randomPositionStartingFrom?: "top" | "bottom" | "left" | "right";
    margin?: number;
  }
) {
  const margin = config?.margin || 0;
  let x = margin + Math.random() * (gameWidth - margin * 2);
  let y = margin + Math.random() * (gameHeight - margin * 2);

  switch (config?.randomPositionStartingFrom) {
    case "top":
      y = margin;
      break;
    case "bottom":
      y = gameHeight - margin;
      break;
    case "left":
      x = margin;
      break;
    case "right":
      x = gameWidth - margin;
      break;
  }

  return { x, y };
}
