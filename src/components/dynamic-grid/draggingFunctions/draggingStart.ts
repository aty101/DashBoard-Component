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

  draggedItemRef.current = {
    id,
    offsetX,
    offsetY,
  };

  const widgetDetails = currentWidgetRef.current!;

  setWidgetPlaceholder({
    id: widgetDetails.id,
    width: widgetDetails.width,
    height: widgetDetails.height,
    x: widgetDetails.x,
    y: widgetDetails.y,
  });

  if (handlersRefs.current) {
    window.addEventListener("pointermove", handlersRefs.current.handleDragging);
    window.addEventListener(
      "pointerup",
      handlersRefs.current.handleDraggingEnd
    );
  }
};
