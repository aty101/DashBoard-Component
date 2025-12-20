import { collisionResolve } from "../../collisionFunctions/collisionResolve";
import { siblingsCollision } from "../../collisionFunctions/siblingsCollision";
import { widgetsCompaction } from "../../collisionFunctions/widgetsCompaction";
import { ResizingParams } from "../resizingTypesAndParams";
import { calcNewSize } from "./calcnewSize";

export const resize = ({
  e,
  resizedItemRef,
  globalRefs,
  setWidgetsDetails,
  setWidgetPlaceholder,
}: ResizingParams) => {
  // Fetch needed refs
  const {
    currentWidgetRef,
    maxColRef,
    widgetPlaceHolderRef,
    animationId,
    widgetsDetailsRef,
    gridSize,
  } = globalRefs;

  if (!resizedItemRef.current || !currentWidgetRef.current || !gridSize.current)
    return;

  // Fetch max cols and rows
  const maxCols = maxColRef.current;

  // Save current widget
  const currentWidget = currentWidgetRef.current;

  // Save initial drag data
  const initResizeData = resizedItemRef.current;

  // Calculate the new size of the widget and placeholder
  const { newWidth, newHeight, finalWidth, finalHeight } = calcNewSize({
    e,
    currentWidget,
    initResizeData,
    maxCols,
    gridSize: gridSize.current,
  });

  // throttled states update
  if (!animationId.current) {
    animationId.current = requestAnimationFrame(() => {
      // Copy widgets excluding the dragged widget
      const widgetsCopy = widgetsDetailsRef.current.filter(
        (w) => w.id !== currentWidget.id
      );

      // Step 4: Push collided widgets down recursively
      const widgetsByY = [...widgetsCopy].sort((a, b) => a.y - b.y);
      collisionResolve(
        { ...currentWidget, width: finalWidth, height: finalHeight },
        widgetsByY,
        widgetsCopy
      );
      // Step 2: Find finalY based on finalX to avoid vertical overlaps

      // Step 3: Create placeholder with finalX and finalY
      // Set the new placeholder object

      const widgetPlaceholder = {
        id: currentWidget.id,
        x: currentWidget.x,
        y: currentWidget.y,
        width: finalWidth,
        height: finalHeight,
      };

      // Set the placeholder ref to be used in the end of resize
      widgetPlaceHolderRef.current = widgetPlaceholder;

      // Step 5: Add moved widget back with updated pos
      const updatedWidgets = [
        ...widgetsCopy,
        { ...currentWidget, width: finalWidth, height: finalHeight },
      ];
      // Step 6: Auto position widgets to compact

      widgetsCompaction(updatedWidgets);

      const lastWidgets = updatedWidgets.map((w) =>
        w.id === widgetPlaceholder.id
          ? { ...w, width: newWidth, height: newHeight }
          : w
      );
      // Step 7: Update state
      setWidgetPlaceholder(widgetPlaceholder);
      setWidgetsDetails(lastWidgets);

      animationId.current = null;
    });
  }
};
