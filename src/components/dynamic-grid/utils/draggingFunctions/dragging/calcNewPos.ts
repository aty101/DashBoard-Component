
import { COL_WIDTH, GAP, ROW_HEIGHT } from "@/components/dynamic-grid/grid-components/DynamicGrid";
import { CalcNewPos } from "../draggingTypesAndParams";

export function calcNewPos({
  e,
  offsetX,
  offsetY,
  maxCols,
  maxRows,
  currentWidget,
}: CalcNewPos) {
  // Calc the current cursor position in grid positioning
  // (convert pixel coords to grid units, considering cell size and gap)
  const cursorX = (e.clientX - offsetX) / (COL_WIDTH + GAP);
  const cursorY = (e.clientY - offsetY) / (ROW_HEIGHT + GAP);

  // Check the drag limits
  const maxX = maxCols - (currentWidget.width - 1);
  const maxY = maxRows - (currentWidget.height - 1);
  const newX = Math.max(0, Math.min(cursorX, maxX));
  const newY = Math.max(0, Math.min(cursorY, maxY));

  // Assign the placeholder in a grid cell
  const finalPosX = Math.round(newX);
  const finalPosY = Math.round(newY);

  return {
    newX,
    newY,
    finalPosX,
    finalPosY,
  };
}
