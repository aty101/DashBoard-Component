import { ResizingParams } from "../resizingTypesAndParams";
import { calcNewSize } from "./calcnewSize";

export const resize = ({
  e,
  resizedItemRef,
  widgetPlaceHolderRef,
  animationId,
  setWidgetsDetails,
  setWidgetPlaceholder,
  currentWidgetRef,
  limitsRef,
}: ResizingParams) => {
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
  const placeholder = {
    id: currentWidget.id,
    x: currentWidget.x,
    y: currentWidget.y,
    width: finalWidth,
    height: finalHeight,
  };

  // Set the placeholder ref to be used in the end of resize
  widgetPlaceHolderRef.current = placeholder;

  // throttled states update
  if (!animationId.current) {
    animationId.current = requestAnimationFrame(() => {
      // Change placeholder in ui
      setWidgetPlaceholder(placeholder);

      // Change the current active widget
      setWidgetsDetails((prev) =>
        prev.map((widget) =>
          widget.id === currentWidget.id
            ? { ...widget, width: newWidth, height: newHeight }
            : widget
        )
      );
      animationId.current = null;
    });
  }
};
