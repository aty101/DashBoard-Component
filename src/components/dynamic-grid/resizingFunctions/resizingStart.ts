import { ResizingStartParams } from "./resizingFunctionsParams";

export const resizeStart = ({
  id,
  e,
  resizedItemRef,
  widgetPlaceHolderRef,
  currentWidgetRef,
  handlersRefs,
}: ResizingStartParams) => {
  e.currentTarget.setPointerCapture(e.pointerId);

  const currentWidget = currentWidgetRef.current!;
  resizedItemRef.current = {
    id,
    width: currentWidget.width,
    height: currentWidget.height,
    x: e.clientX,
    y: e.clientY,
  };

  widgetPlaceHolderRef.current = {
    id,
    width: currentWidget.width,
    height: currentWidget.height,
    x: currentWidget.x,
    y: currentWidget.y,
  };

  if (handlersRefs.current) {
    window.addEventListener("pointermove", handlersRefs.current.handleResize);
    window.addEventListener("pointerup", handlersRefs.current.handleResizeEnd);
  }
};
