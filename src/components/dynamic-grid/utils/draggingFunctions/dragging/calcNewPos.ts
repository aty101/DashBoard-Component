import {
  COL_WIDTH,
  GAP,
  ROW_HEIGHT,
} from "@/components/dynamic-grid/grid-components/DynamicGrid";

import {
  WidgetDetailsType,
  WidgetPlaceHolderType,
} from "@/components/dynamic-grid/types";

// Check if two widgets overlap
function widgetsOverlap(a: WidgetPlaceHolderType, b: WidgetDetailsType) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export function calcNewPos({
  e,
  offsetX,
  offsetY,
  maxCols,
  maxRows,
  currentWidget,
}: {
  e: PointerEvent;
  offsetX: number;
  offsetY: number;
  maxCols: number;
  maxRows: number;
  currentWidget: WidgetDetailsType;
}) {
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
  let y = 0;

  while (true) {
    // Check if widget overlaps any existing widget at this y
    const collisions = widgets.filter((w) => {
      if (w.id === widget.id) return false;
      const horizontalOverlap =
        w.x < targetX + widget.width && w.x + w.width > targetX;
      const verticalOverlap = w.y < y + widget.height && w.y + w.height > y;

      return horizontalOverlap && verticalOverlap;
    });

    if (collisions.length === 0) return y;

    y = Math.max(...collisions.map((w) => w.y + w.height));
  }
}

// Push collided widgets down recursively
export function pushOverlappedWidgetsDown(
  draggedWidget: WidgetPlaceHolderType,
  widgets: WidgetDetailsType[]
) {
  // Keep pushing overlapped widgets down until no collisions
  let collisionDetected = true;

  while (collisionDetected) {
    collisionDetected = false;

    for (const widget of widgets) {
      if (widget.id === draggedWidget.id) continue;

      const isOverlapping =
        draggedWidget.x < widget.x + widget.width &&
        draggedWidget.x + draggedWidget.width > widget.x &&
        draggedWidget.y < widget.y + widget.height &&
        draggedWidget.y + draggedWidget.height > widget.y;

      if (isOverlapping) {
        // Push the overlapped widget down *below* the dragged widget
        widget.y = draggedWidget.y + draggedWidget.height;

        // Now the pushed widget might overlap others, so set draggedWidget to that widget for next iteration
        draggedWidget = {
          id: widget.id,
          x: widget.x,
          y: widget.y,
          width: widget.width,
          height: widget.height,
        };

        collisionDetected = true;
        break; // restart the loop to check all widgets again
      }
    }
  }
}

// Compact widgets upwards to fill empty vertical space
export function autoPositionWidgets(widgets: WidgetDetailsType[]) {
  // Sort widgets by x then y ascending
  widgets.sort((a, b) => a.x - b.x || a.y - b.y);

  for (let i = 0; i < widgets.length; i++) {
    const widget = widgets[i];

    let targetY = 0;

    while (true) {
      const collision = widgets.some((w) => {
        if (w.id === widget.id) return false;
        return widgetsOverlap({ ...widget, y: targetY }, w);
      });

      if (!collision) {
        widget.y = targetY;
        break;
      }
      targetY++;
    }
  }
}
