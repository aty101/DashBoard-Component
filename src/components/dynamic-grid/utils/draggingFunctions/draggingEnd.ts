import { DraggingEndParams } from "./draggingTypesAndParams";

export const draggingEnd = ({
  draggingOffsetsRef,
  handlersRefs,
  globalRefs,
  setWidgetsDetails,
  setWidgetPlaceholder,
}: DraggingEndParams) => {
  // Fetch needed refs
  const { widgetPlaceHolderRef, animationId } = globalRefs;

  if (!widgetPlaceHolderRef.current) return;

  const placeHolder = widgetPlaceHolderRef.current;

  // Reset the initial drag offset ref
  draggingOffsetsRef.current = null;

  // Stop any working frame
  if (animationId.current) {
    cancelAnimationFrame(animationId.current);
    animationId.current = null;
  }

  // Reset placeholder to hide it
  setWidgetPlaceholder(null);

  // Assign the widget to its placeholder (nearest grid cell)
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
