import { WidgetPlaceHolderType } from "../../types";
import { DraggingParams } from "../draggingTypesAndParams";
import { calcNewPos } from "./calcNewPos";

export const dragging = ({
  e,
  draggingOffsetsRef,
  animationId,
  widgetPlaceHolderRef,
  setWidgetPlaceholder,
  setWidgetsDetails,
  currentWidgetRef,
  limitsRef,
}: DraggingParams) => {
  if (!draggingOffsetsRef.current || !currentWidgetRef.current) return;

  // Fetch max cols and rows
  const maxCols = limitsRef.current.maxCol;
  const maxRows = limitsRef.current.maxRow;

  // Fetch initial offsets
  const { offsetX, offsetY } = draggingOffsetsRef.current;

  // Save current widget
  const currentWidget = currentWidgetRef.current;

  // Calculate the new pos of widget and placeholder
  const { finalPosX, finalPosY, newX, newY } = calcNewPos({
    e,
    offsetX,
    offsetY,
    maxCols,
    maxRows,
    currentWidget,
  });

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
