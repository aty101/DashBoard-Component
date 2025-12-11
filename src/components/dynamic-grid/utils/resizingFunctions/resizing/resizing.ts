import { siblingsCollision } from "../../collisionFunctions/siblingsCollision";
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
    limitsRef,
    widgetPlaceHolderRef,
    animationId,
    widgetsDetailsRef,
  } = globalRefs;

  if (!resizedItemRef.current || !currentWidgetRef.current) return;

  // Fetch max cols and rows
  const maxCols = limitsRef.current.maxCol;
  const maxRows = limitsRef.current.maxRow;

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
    maxRows,
  });

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

  // throttled states update
  if (!animationId.current) {
    animationId.current = requestAnimationFrame(() => {
      // Change placeholder in ui
      setWidgetPlaceholder(widgetPlaceholder);

      const copy = widgetsDetailsRef.current.filter(
        (widget) => widget.id !== currentWidgetRef.current?.id
      );

      siblingsCollision({
        widgetPlaceholder: widgetPlaceholder,
        widgetsDetails: copy,
      });

      const widgetsState = [
        ...copy,
        {
          ...currentWidget,
          width: newWidth,
          height: newHeight,
        },
      ];

      // Change current active widget
      setWidgetsDetails(widgetsState);

      animationId.current = null;
    });
  }
};
