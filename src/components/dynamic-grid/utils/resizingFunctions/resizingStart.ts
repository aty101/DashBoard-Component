import { ResizingStartParams } from "./resizingTypesAndParams";

export const resizeStart = ({
  e,
  resizedItemRef,
  handlersRefs,
  globalRefs,
}: ResizingStartParams) => {
  // Fetch needed refs
  const { currentWidgetRef, gridSize } = globalRefs;

  if (!currentWidgetRef.current || !gridSize.current) return;

  const { COL_WIDTH, ROW_HEIGHT, GAP } = gridSize.current;
  // Capture the pointer so resize stays smooth even if the cursor leaves the element
  e.currentTarget.setPointerCapture(e.pointerId);

  // Get current widget object
  const currentWidget = currentWidgetRef.current;

  // pixel size of the widget
  const pixelWidth =
    currentWidget.width * COL_WIDTH + (currentWidget.width - 1) * GAP;

  const pixelHeight =
    currentWidget.height * ROW_HEIGHT + (currentWidget.height - 1) * GAP;

  // Store initial widget size and cursor position so we can calculate deltas during resize
  resizedItemRef.current = {
    width: pixelWidth,
    height: pixelHeight,
    cursorGlobX: e.clientX,
    cursorGlobY: e.clientY,
  };

  // Add pointer global events
  if (handlersRefs.current) {
    window.addEventListener("pointermove", handlersRefs.current.handleResize);
    window.addEventListener("pointerup", handlersRefs.current.handleResizeEnd);
  }
};
