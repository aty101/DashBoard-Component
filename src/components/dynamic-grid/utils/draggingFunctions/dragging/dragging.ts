import { WidgetPlaceHolderType } from "@/components/dynamic-grid/types";
import { DraggingParams } from "../draggingTypesAndParams";
import { calcNewPos, findFinalY } from "./calcNewPos";

export const dragging = ({
  e,
  draggingOffsetsRef,
  globalRefs,
  setWidgetPlaceholder,
  setWidgetsDetails,
}: DraggingParams) => {
  const {
    currentWidgetRef,
    limitsRef,
    widgetPlaceHolderRef,
    animationId,
    widgetsDetailsRef,
  } = globalRefs;
  if (!draggingOffsetsRef.current || !currentWidgetRef.current) return;

  const maxCols = limitsRef.current.maxCol;
  const maxRows = limitsRef.current.maxRow;

  const { offsetX, offsetY } = draggingOffsetsRef.current;
  const currentWidget = currentWidgetRef.current;

  // Step 1: Calculate finalX and preliminary realY (newY) based on pointer event and limits
  const { finalPosX, newX, newY, } = calcNewPos({
    e,
    offsetX,
    offsetY,
    maxCols,
    currentWidget,
    maxRows,
  });

  // Step 2: Find finalY based on finalX to avoid vertical overlaps
  const finalPosY = findFinalY(
    { ...currentWidget, x: finalPosX, y: 0 }, // y=0 for searching
    widgetsDetailsRef.current.filter((w) => w.id !== currentWidget.id),
    finalPosX
  );

  // Step 3: Create placeholder with finalX and finalY
  const widgetPlaceHolder: WidgetPlaceHolderType = {
    id: currentWidget.id,
    x: finalPosX,
    y: finalPosY,
    width: currentWidget.width,
    height: currentWidget.height,
  };

  widgetPlaceHolderRef.current = widgetPlaceHolder;

  if (!animationId.current) {
    animationId.current = requestAnimationFrame(() => {
      setWidgetPlaceholder(widgetPlaceHolder);

      // Copy widgets excluding the dragged widget
      const widgetsCopy = widgetsDetailsRef.current.filter(
        (w) => w.id !== currentWidget.id
      );

      // Step 4: Push collided widgets down recursively
      // pushOverlappedWidgetsDown(widgetPlaceHolder, widgetsCopy);

      // Step 5: Add moved widget back with updated pos
      const updatedWidgets = [
        ...widgetsCopy,
        { ...currentWidget, x: newX, y: newY },
      ];
      // Step 6: Auto position widgets to compact
      // autoPositionWidgets(updatedWidgets);

      // Step 7: Update state
      setWidgetsDetails(updatedWidgets);

      animationId.current = null;
    });
  }
};
