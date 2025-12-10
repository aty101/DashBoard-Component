import { DraggingEndParams } from "./draggingFunctionsParams";

export const draggingEnd = ({
  draggingOffsetsRef,
  widgetPlaceHolderRef,
  animationId,
  handlersRefs,
  setWidgetsDetails,
  setWidgetPlaceholder,
}: DraggingEndParams) => {
  const placeHolder = widgetPlaceHolderRef.current;

  // Reset the initial drag offset ref 
  draggingOffsetsRef.current = null;

  // Reset placeholder to hide it
  setWidgetPlaceholder(null);

  // Assign the widget to its placeholder (nearest grid cell)
  if (placeHolder)
    setWidgetsDetails((prev) =>
      prev.map((widget) => {
        return widget.id === placeHolder.id
          ? {
              ...widget,
              x: placeHolder.x,
              y: placeHolder.y,
            }
          : widget;
      })
    );
  
  // Stop any working frame  
  if (animationId.current) {
    cancelAnimationFrame(animationId.current);
    animationId.current = null;
  }

  // Remove the pointer global events
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
