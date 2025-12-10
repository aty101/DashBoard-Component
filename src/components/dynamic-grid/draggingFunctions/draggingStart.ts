import { DraggingStartParams } from "./draggingFunctionsParams";

export const draggingStart = ({
  e,
  draggingOffsetsRef,
  handlersRefs,
}: DraggingStartParams) => {
  // Set current pointer (avoid bugs)
  e.currentTarget.setPointerCapture(e.pointerId);

  // Get widget bounds
  const widgetRect = e.currentTarget.getBoundingClientRect();

  // Get the grid bounds
  const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();

  // Calc cursor offset from the widget for smooth drag
  // (parentRect add to solve a glitch came of the parent shifted pos)
  const offsetX = e.clientX - widgetRect.left + (parentRect?.left ?? 0);
  const offsetY = e.clientY - widgetRect.top + (parentRect?.top ?? 0);

  // Set the cursor offset ref
  draggingOffsetsRef.current = {
    offsetX,
    offsetY,
  };

  // Add pointer global events
  if (handlersRefs.current) {
    window.addEventListener("pointermove", handlersRefs.current.handleDragging);
    window.addEventListener(
      "pointerup",
      handlersRefs.current.handleDraggingEnd
    );
  }
};
