import { ResizingParams } from "./resizingFunctionsParams";

export const resize = ({
  e,
  resizedItemRef,
  widgetPlaceHolderRef,
  animationId,
  setWidgetsDetails,
  setWidgetPlaceholder,
  COL_WIDTH,
  ROW_HEIGHT,
}: ResizingParams) => {
  if (!resizedItemRef.current) return;
  const current = resizedItemRef.current;

  const newWidth = (current.width + e.clientX - current.x) / COL_WIDTH;
  const newHeight = (current.height + e.clientY - current.y) / ROW_HEIGHT;

  const finalPos = widgetPlaceHolderRef.current;

  if (finalPos) {
    widgetPlaceHolderRef.current = {
      ...finalPos,
      width: Math.ceil(newWidth),
      height: Math.ceil(newHeight),
    };
    setWidgetPlaceholder({
      ...finalPos,
      width: Math.ceil(newWidth),
      height: Math.ceil(newHeight),
    });
  }

  if (!animationId.current) {
    animationId.current = requestAnimationFrame(() => {
      setWidgetsDetails((prev) =>
        prev.map((widget) => {
          if (widget.id === current.id) {
            return {
              ...widget,
              width: Math.max(newWidth, 1),
              height: Math.max(newHeight, 1),
            };
          } else {
            return widget;
          }
        })
      );
      animationId.current = null;
    });
  }
};
