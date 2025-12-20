import {
  GridSizeType,
  WidgetDetailsType,
  WidgetPlaceHolderType,
} from "@/components/dynamic-grid/types";

export function calcNewPos({
  e,
  offsetX,
  offsetY,
  maxCols,
  currentWidget,
  gridSize,
}: {
  e: PointerEvent;
  offsetX: number;
  offsetY: number;
  maxCols: number;
  currentWidget: WidgetDetailsType;
  gridSize: GridSizeType;
}) {
  // Calc the current cursor position in grid positioning
  // (convert pixel coords to grid units, considering cell size and gap)
  const { COL_WIDTH, ROW_HEIGHT, GAP } = gridSize;
  const cursorX = (e.clientX - offsetX) / (COL_WIDTH + GAP);
  const cursorY = (e.clientY - offsetY) / (ROW_HEIGHT + GAP);

  // Check the drag limits
  const maxX = maxCols - (currentWidget.width - 1);

  const newX = Math.max(0, Math.min(cursorX, maxX - 1));
  const newY = Math.max(0, cursorY);

  // Assign the placeholder in a grid cell
  const finalPosX = Math.round(newX);
  const realY = Math.round(newY);

  return {
    newX,
    newY,
    finalPosX,
    realY,
  };
}
// Find the lowest y-position at x where the widget fits (no vertical overlap)
export function findFinalY(
  widget: WidgetPlaceHolderType,
  widgets: WidgetDetailsType[],
  targetX: number
): number {
  let y = widget.y;

  while (true) {
    // Check if widget overlaps any existing widget at this y
    const collision = widgets.some((w) => {
      if (w.id === widget.id) return false;
      const horizontalOverlap =
        w.x < targetX + widget.width && w.x + w.width > targetX;
      const verticalOverlap =
        w.y < y - 1 + widget.height && w.y + w.height > y - 1;

      return horizontalOverlap && verticalOverlap;
    });

    if (!collision && y != 0) {
      y--;
      continue;
    }

    return y;
  }
}
