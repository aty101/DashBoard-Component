import {
  COL_WIDTH,
  GAP,
  ROW_HEIGHT,
} from "@/components/dynamic-grid/grid-components/DynamicGrid";
import { CalcNewPos, CalcRePos } from "../draggingTypesAndParams";
import { WidgetDetailsType } from "@/components/dynamic-grid/types";

export function findFirstAvailableRow(
  currentWidget: WidgetDetailsType,
  widgets: WidgetDetailsType[],
  x: number
) {
  let y = 0;

  while (true) {
    let nextY = y;

    const hasCollision = widgets.some((widget) => {
      if (widget.id === currentWidget.id) return false;

      const xOverlap =
        widget.x < x + currentWidget.width && widget.x + widget.width > x;

      const yOverlap =
        widget.y < y + currentWidget.height && widget.y + widget.height > y;

      if (xOverlap && yOverlap) {
        // jump y to the bottom of the colliding widget
        nextY = Math.max(nextY, widget.y + widget.height);
        return true;
      }

      return false;
    });

    if (!hasCollision) return y;

    y = nextY;
  }
}

export function calcNewPos({
  e,
  offsetX,
  offsetY,
  maxCols,
  maxRows,
  currentWidget,
  widgetsDetails,
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
  const realY = Math.round(newY);
  const finalPosY = findFirstAvailableRow(
    currentWidget,
    widgetsDetails,
    finalPosX
  );

  return {
    newX,
    newY,
    finalPosX,
    realY,
    finalPosY,
  };
}

export function calcRePos({
  maxCols,
  maxRows,
  currentWidget,
  widgetsDetails,
}: CalcRePos) {
  const x = currentWidget.x;
  const y = currentWidget.y;
  // Check the drag limits
  const maxX = maxCols - (currentWidget.width - 1);
  const maxY = maxRows - (currentWidget.height - 1);
  const newX = Math.max(0, Math.min(x, maxX));
  const newY = Math.max(0, Math.min(y, maxY));

  // Assign the placeholder in a grid cell
  const finalPosX = Math.round(newX);
  const realY = Math.round(newY);
  const finalPosY = findFirstAvailableRow(
    currentWidget,
    widgetsDetails,
    finalPosX
  );

  return {
    finalPosX,
    realY,
    finalPosY,
  };
}
