import { ResizingEndParams } from "./resizingFunctionsParams";

export const resizeEnd = ({
  resizedItemRef,
  widgetPlaceHolderRef,
  animationId,
  setWidgetPlaceholder,
  setWidgetsDetails,
  handlersRefs,
}: ResizingEndParams) => {
  const finalPos = widgetPlaceHolderRef.current;

  if (finalPos) {
    setWidgetsDetails((prev) =>
      prev.map((widget) => {
        if (widget.id === finalPos.id) {
          return {
            ...widget,
            width: Math.max(finalPos.width, 1),
            height: Math.max(finalPos.height, 1),
          };
        } else {
          return widget;
        }
      })
    );
  }
  if (animationId.current) {
    cancelAnimationFrame(animationId.current);
    animationId.current = null;
  }
  setWidgetPlaceholder(null);
  resizedItemRef.current = null;
  widgetPlaceHolderRef.current = null;

  if (handlersRefs.current) {
    window.removeEventListener(
      "pointermove",
      handlersRefs.current.handleResize
    );
    window.removeEventListener(
      "pointerup",
      handlersRefs.current.handleResizeEnd
    );
  }
};
