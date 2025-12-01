import { DraggingEndParams } from "./draggingFunctionsParams";

export const draggingEnd = ({
  draggedItemRef,
  widgetPlaceHolderRef,
  animationId,
  handlersRefs,
  setWidgetsDetails,
  setWidgetPlaceholder,
}: DraggingEndParams) => {
  const saveFinalPos = widgetPlaceHolderRef.current
    ? { ...widgetPlaceHolderRef.current }
    : null;
  if (saveFinalPos) {
    setWidgetsDetails((prev) =>
      prev.map((widget) => {
        return widget.id === saveFinalPos.id
          ? {
              ...widget,
              x: saveFinalPos.x,
              y: saveFinalPos.y,
            }
          : widget;
      })
    );
  }
  setWidgetPlaceholder(null);
  draggedItemRef.current = null;
  widgetPlaceHolderRef.current = null;
  if (animationId.current) {
    cancelAnimationFrame(animationId.current);
    animationId.current = null;
  }

  if (handlersRefs.current) {
    window.removeEventListener(
      "pointermove",
      handlersRefs.current.handleDragging
    );
    window.removeEventListener(
      "pointerup",
      handlersRefs.current.handleDraggingEnd
    );
  }
};
