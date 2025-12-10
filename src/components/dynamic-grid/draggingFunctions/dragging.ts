import { WidgetDetailsType, WidgetPlaceHolderType } from "./../types";
import { COL_WIDTH, GAP, ROW_HEIGHT } from "../DynamicGrid";
import { DraggingParams } from "./draggingFunctionsParams";

export const dragging = ({
  e,
  draggingOffsetsRef,
  animationId,
  widgetPlaceHolderRef,
  setWidgetPlaceholder,
  setWidgetsDetails,
  currentWidgetRef,
  maxCols,
  maxRows,
}: DraggingParams) => {
  if (!draggingOffsetsRef.current || !currentWidgetRef.current) return;

  const offsets = draggingOffsetsRef.current;
  const currentWidget = currentWidgetRef.current;

  // Calc the current cursor position in grid positioning
  // (convert pixel coords to grid units, considering cell size and gap)
  const cursorX = (e.clientX - offsets.offsetX) / (COL_WIDTH + GAP);
  const cursorY = (e.clientY - offsets.offsetY) / (ROW_HEIGHT + GAP);

  // Stop the drag to be out of the grid limits
  const newX = Math.max(
    0,
    Math.min(cursorX, maxCols - (currentWidget.width - 1))
  );
  const newY = Math.max(
    0,
    Math.min(cursorY, maxRows - (currentWidget.height - 1))
  );

  // Assign the placeholder in a grid cell
  const finalPosX = Math.round(newX);
  const finalPosY = Math.round(newY);

  // Create the placeholder widget object with current dimensions and position
  const widgetPlaceHolder: WidgetPlaceHolderType = {
    id: currentWidget.id,
    x: finalPosX,
    y: finalPosY,
    width: currentWidget.width,
    height: currentWidget.height,
  };

  // Store the placeholder in ref for use outside this function if needed
  widgetPlaceHolderRef.current = widgetPlaceHolder;

  // Set animationFrame to reduce the number of rerenders during drag
  if (!animationId.current) {
    animationId.current = requestAnimationFrame(() => {
      // Change the placeholder on ui
      setWidgetPlaceholder(widgetPlaceHolder);

      // Change current active widget
      setWidgetsDetails((prev) =>
        prev.map((widget) =>
          widget.id === currentWidget.id
            ? {
                ...widget,
                x: newX,
                y: newY,
              }
            : widget
        )
      );
      animationId.current = null;
    });
  }
};
