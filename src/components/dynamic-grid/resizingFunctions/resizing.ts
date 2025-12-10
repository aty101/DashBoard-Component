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

  const current = resizedItemRef.current;

  // pixel size of the widget before resizing
  const pixelWidthBefore =
    current.width * COL_WIDTH + (current.width - 1) * GAP;

  const pixelHeightBefore =
    current.height * ROW_HEIGHT + (current.height - 1) * GAP;

  // mouse movement since resize start
  const dx = e.clientX - current.cursorGlobX;
  const dy = e.clientY - current.cursorGlobY;

  // new pixel dimensions
  const pixelWidth = pixelWidthBefore + dx;
  const pixelHeight = pixelHeightBefore + dy;

  // convert pixel → grid (🔥 no multipliers here)
  let newWidth = Math.max((pixelWidth + GAP) / (COL_WIDTH + GAP), 2);

  let newHeight = Math.max((pixelHeight + GAP) / (ROW_HEIGHT + GAP), 1);

  if (currentWidgetRef.current.x + newWidth - 1 >= maxCols) {
    newWidth = maxCols - (currentWidgetRef.current.x - 1);
  }
  if (currentWidgetRef.current.y + newHeight - 1 >= maxRows) {
    newHeight = maxRows - (currentWidgetRef.current.y - 1);
  }

  // update placeholder
  if (widgetPlaceHolderRef.current) {
    widgetPlaceHolderRef.current = {
      ...widgetPlaceHolderRef.current,
      width: Math.round(newWidth),
      height: Math.round(newHeight),
    };
    setWidgetPlaceholder(widgetPlaceHolderRef.current);
  }

  // throttled state update
  if (!animationId.current) {
    animationId.current = requestAnimationFrame(() => {
      setWidgetsDetails((prev) =>
        prev.map((widget) =>
          widget.id === current.id
            ? { ...widget, width: newWidth, height: newHeight }
            : widget
        )
      );
      animationId.current = null;
    });
  }
};
