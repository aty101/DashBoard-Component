import { WidgetPlaceHolderType } from "@/components/dynamic-grid/types";
import { DraggingParams } from "../draggingTypesAndParams";
import { calcNewPos } from "./calcNewPos";
import { siblingsCollision } from "../../collisionFunctions/siblingsCollision";

export const dragging = ({
  e,
  draggingOffsetsRef,
  globalRefs,
  setWidgetPlaceholder,
  setWidgetsDetails,
}: DraggingParams) => {
  // Fetch needed refs
  const {
    currentWidgetRef,
    limitsRef,
    widgetPlaceHolderRef,
    animationId,
    widgetsDetailsRef,
  } = globalRefs;
  if (!draggingOffsetsRef.current || !currentWidgetRef.current) return;

  // Fetch max cols and rows
  const maxCols = limitsRef.current.maxCol;
  const maxRows = limitsRef.current.maxRow;

  // Fetch initial offsets
  const { offsetX, offsetY } = draggingOffsetsRef.current;

  // Save current widget
  const currentWidget = currentWidgetRef.current;

  // Set animationFrame to reduce the number of rerenders during drag
  if (!animationId.current) {
    animationId.current = requestAnimationFrame(() => {
      // Calculate the new pos of widget and placeholder
      const { finalPosX, finalPosY, newX, newY, realY } = calcNewPos({
        e,
        offsetX,
        offsetY,
        maxCols,
        maxRows,
        currentWidget,
        widgetsDetails: widgetsDetailsRef.current,
      });

      // Create the placeholder widget object with current dimensions and position
      const widgetPlaceHolder: WidgetPlaceHolderType = {
        id: currentWidget.id,
        x: finalPosX,
        y: realY,
        width: currentWidget.width,
        height: currentWidget.height,
      };

      const copy = widgetsDetailsRef.current.filter(
        (widget) => widget.id !== currentWidgetRef.current?.id
      );

      // siblingsCollision({
      //   widgetPlaceholder: widgetPlaceHolder,
      //   widgetsDetails: copy,
      // });

      // Store the placeholder in ref for use outside this function if needed
      widgetPlaceHolderRef.current = { ...widgetPlaceHolder, y: finalPosY };

      // Change the placeholder on ui
      setWidgetPlaceholder({ ...widgetPlaceHolder, y: finalPosY });

      const widgetsState = [
        ...copy,
        {
          ...currentWidget,
          x: newX,
          y: newY,
        },
      ];

      // Change current active widget
      setWidgetsDetails(widgetsState);
      animationId.current = null;
    });
  }
};
