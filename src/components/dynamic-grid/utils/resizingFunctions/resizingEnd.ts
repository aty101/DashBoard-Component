import { ResizingEndParams } from "./resizingTypesAndParams";

export const resizeEnd = ({
  resizedItemRef,
  widgetPlaceHolderRef,
  animationId,
  setWidgetPlaceholder,
  setWidgetsDetails,
  handlersRefs,
}: ResizingEndParams) => {
  if (!widgetPlaceHolderRef.current) return;

  // Save the placeholder data which will be the last data of the widget
  const placeholder = widgetPlaceHolderRef.current;

  // Reset the initial data object
  resizedItemRef.current = null;

  // Reset placeholder to hide it from ui
  setWidgetPlaceholder(null);

  // Set final size
  const finalWidth = placeholder.width;
  const finalHeight = placeholder.height;

  // Set the widget to the nearest grid cell with the nearest sutable size
  setWidgetsDetails((prev) =>
    prev.map((widget) => {
      if (widget.id === placeholder.id) {
        return {
          ...widget,
          width: finalWidth,
          height: finalHeight,
        };
      } else {
        return widget;
      }
    })
  );

  // Stop any current running animation frame
  if (animationId.current) {
    cancelAnimationFrame(animationId.current);
    animationId.current = null;
  }

  // Remove the pointer global events
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
