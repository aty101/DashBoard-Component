import { DraggingStartParams } from "./draggingFunctionsParams";

export const draggingStart = ({
  id,
  e,
  draggedItemRef,
  currentWidgetRef,
  handlersRefs,
  setWidgetPlaceholder,
}: DraggingStartParams) => {
  e.currentTarget.setPointerCapture(e.pointerId);

  const widgetRect = e.currentTarget.getBoundingClientRect();
  const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();

  const offsetX = e.clientX - widgetRect.left + (parentRect?.left ?? 0);
  const offsetY = e.clientY - widgetRect.top + (parentRect?.top ?? 0);

  const currentWidget = currentWidgetRef.current!

  draggedItemRef.current = {
    id,
    offsetX,
    offsetY,
  };

  setWidgetPlaceholder({
    id: currentWidget.id,
    width: currentWidget.width,
    height: currentWidget.height,
    x: currentWidget.x,
    y: currentWidget.y,
  });

  if (handlersRefs.current) {
    window.addEventListener("pointermove", handlersRefs.current.handleDragging);
    window.addEventListener(
      "pointerup",
      handlersRefs.current.handleDraggingEnd
    );
  }
};
