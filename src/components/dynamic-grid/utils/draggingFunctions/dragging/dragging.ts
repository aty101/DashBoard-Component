import { WidgetPlaceHolderType } from "@/components/dynamic-grid/types";
import { DraggingParams } from "../draggingTypesAndParams";
import { calcNewPos, findFinalY } from "./calcNewPos";
import { collisionResolve } from "../../collisionFunctions/collisionResolve";
import { widgetsCompaction } from "../../collisionFunctions/widgetsCompaction";

export const dragging = ({
  e,
  draggingOffsetsRef,
  globalRefs,
  setWidgetPlaceholder,
  setWidgetsDetails,
}: DraggingParams) => {
  const {
    currentWidgetRef,
    maxColRef,
    widgetPlaceHolderRef,
    animationId,
    widgetsDetailsRef,
    parentRef,
    gridSize,
  } = globalRefs;
  if (
    !draggingOffsetsRef.current ||
    !currentWidgetRef.current ||
    !parentRef.current ||
    !gridSize.current
  )
    return;

  const maxCols = maxColRef.current;

  const { offsetX, offsetY } = draggingOffsetsRef.current;
  const currentWidget = currentWidgetRef.current;

  // Step 1: Calculate finalX and preliminary realY (newY) based on pointer event and limits
  const { finalPosX, newX, newY, realY } = calcNewPos({
    e,
    offsetX,
    offsetY,
    maxCols,
    currentWidget,
    gridSize: gridSize.current,
  });

  if (!animationId.current) {
    animationId.current = requestAnimationFrame(() => {
      // Copy widgets excluding the dragged widget
      const widgetsCopy = widgetsDetailsRef.current.filter(
        (w) => w.id !== currentWidget.id
      );

      // Step 4: Push collided widgets down recursively
      const widgetsByY = [...widgetsCopy].sort((a, b) => a.y - b.y);
      collisionResolve(
        { ...currentWidget, x: finalPosX, y: realY },
        widgetsByY,
        widgetsCopy
      );
      // Step 2: Find finalY based on finalX to avoid vertical overlaps
      const finalPosY = findFinalY(
        { ...currentWidget, x: finalPosX, y: realY }, // y=0 for searching
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

      // Step 5: Add moved widget back with updated pos
      const updatedWidgets = [
        ...widgetsCopy,
        { ...currentWidget, x: finalPosX, y: finalPosY },
      ].sort((a, b) => a.y - b.y);
      // Step 6: Auto position widgets to compact

      widgetsCompaction(currentWidget, updatedWidgets);

      const lastWidgets = updatedWidgets.map((w) =>
        w.id === widgetPlaceHolder.id ? { ...w, x: newX, y: newY } : w
      );
      // Step 7: Update state
      setWidgetsDetails(lastWidgets);

      animationId.current = null;
    });
  }
};
