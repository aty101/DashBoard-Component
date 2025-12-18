import { WidgetPlaceHolderType } from "@/components/dynamic-grid/types";
import { DraggingParams } from "../draggingTypesAndParams";
import {
  autoPositionWidgets,
  calcNewPos,
  findFinalY,
  pushOverlappedWidgetsDown,
  pushOverlappedWidgetsDownOptimized,
} from "./calcNewPos";

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
  const { finalPosX, newX, newY, realY } = calcNewPos({
    e,
    offsetX,
    offsetY,
    maxCols,
    currentWidget,
    maxRows,
  });
 

  if (!animationId.current) {
    animationId.current = requestAnimationFrame(() => {
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
      setWidgetPlaceholder(widgetPlaceHolder);

      // Copy widgets excluding the dragged widget
      const widgetsCopy = widgetsDetailsRef.current.filter(
        (w) => w.id !== currentWidget.id
      );

      // Step 4: Push collided widgets down recursively
      const widgetsByY = [...widgetsCopy].sort((a, b) => a.y - b.y);
      
      
      pushOverlappedWidgetsDownOptimized(
        { ...widgetPlaceHolder, x: finalPosX, y: realY },
        widgetsByY,
        widgetsCopy
      );

      // Step 5: Add moved widget back with updated pos
      const updatedWidgets = [
        ...widgetsCopy,
        { ...currentWidget, x: finalPosX, y: realY },
      ];
      // Step 6: Auto position widgets to compact

      autoPositionWidgets(widgetPlaceHolder.id, updatedWidgets);
      
      const lastWidgets = updatedWidgets.map((w) =>
        w.id === widgetPlaceHolder.id ? { ...w, x: newX, y: newY } : w
      );
      // Step 7: Update state
      setWidgetsDetails(lastWidgets);

      animationId.current = null;
    });
  }
};
