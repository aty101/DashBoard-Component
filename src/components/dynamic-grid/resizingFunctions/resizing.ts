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

  const newWidth = Math.max(
    (current.width + e.clientX - current.x) / COL_WIDTH,
    2
  );
  const newHeight = Math.max(
    (current.height + e.clientY - current.y) / ROW_HEIGHT,
    1
  );

  const finalPos = widgetPlaceHolderRef.current;

  if (finalPos) {
    widgetPlaceHolderRef.current = {
      ...finalPos,
      width: Math.round(newWidth),
      height: Math.round(newHeight),
    };
    setWidgetPlaceholder({
      ...finalPos,
      width: Math.round(newWidth),
      height: Math.round(newHeight),
    });
  }

  if (!animationId.current) {
    animationId.current = requestAnimationFrame(() => {
      setWidgetsDetails((prev) =>
        prev.map((widget) => {
          if (widget.id === current.id) {
            return {
              ...widget,
              width: newWidth,
              height: newHeight,
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
