import { COL_WIDTH, GAP, ROW_HEIGHT } from "../DynamicGrid";
import { ResizingParams } from "./resizingFunctionsParams";

export const resize = ({
  e,
  resizedItemRef,
  widgetPlaceHolderRef,
  animationId,
  setWidgetsDetails,
  setWidgetPlaceholder,
  currentWidgetRef,
  maxCols,
  maxRows,
}: ResizingParams) => {
  if (!resizedItemRef.current || !currentWidgetRef.current) return;

  const currentWidget = currentWidgetRef.current;
  const initResizeData = resizedItemRef.current;

  // mouse movement since resize start
  const dx = e.clientX - initResizeData.cursorGlobX;
  const dy = e.clientY - initResizeData.cursorGlobY;

  // new pixel dimensions
  const pixelWidth = initResizeData.width + dx;
  const pixelHeight = initResizeData.height + dy;

  // convert pixel to grid
  const gridWidth = (pixelWidth + GAP) / (COL_WIDTH + GAP);
  const gridHeight = (pixelHeight + GAP) / (ROW_HEIGHT + GAP);

  // Check if the size didnt pass the min and max
  const maxWidth = maxCols - (currentWidget.x - 1);
  const maxHeight = maxRows - (currentWidget.y - 1);
  const newWidth = Math.min(maxWidth, Math.max(gridWidth, 2));
  const newHeight = Math.min(maxHeight, Math.max(gridHeight, 1));

  // Placeholder current size
  const finalWidth = Math.round(newWidth);
  const finalHeight = Math.round(newHeight);

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
