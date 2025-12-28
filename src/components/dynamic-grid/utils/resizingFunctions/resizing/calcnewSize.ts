import { CalcNewSizeParams } from "../resizingTypesAndParams";

export function calcNewSize({
  e,
  currentWidget,
  initResizeData,
  maxCols,

  gridSize,
}: CalcNewSizeParams) {
  const { COL_WIDTH, ROW_HEIGHT, GAP } = gridSize;
  // Mouse movement since resize start
  const dx = e.clientX - initResizeData.cursorGlobX;
  const dy = e.clientY - initResizeData.cursorGlobY;

  // New pixel dimensions
  const pixelWidth = initResizeData.width + dx;
  const pixelHeight = initResizeData.height + dy;

  // Convert pixel to grid
  const gridWidth = (pixelWidth + GAP) / (COL_WIDTH + GAP);
  const gridHeight = (pixelHeight + GAP) / (ROW_HEIGHT + GAP);

  // Check if the size didnt pass the min and max
  const maxWidth = maxCols - (currentWidget.x - 1);

  const newWidth = Math.min(maxWidth, Math.max(gridWidth, currentWidget.minWidth));
  const newHeight = Math.max(gridHeight, currentWidget.minHeight);

  // Placeholder current size
  const finalWidth = Math.round(newWidth);
  const finalHeight = Math.round(newHeight);

  return {
    newWidth,
    newHeight,
    finalWidth,
    finalHeight,
  };
}
