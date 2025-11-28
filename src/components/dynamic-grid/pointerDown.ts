import { RefObject } from "react";
import { DraggedItemType, SetStateType, WidgetDetailsType } from "./types";

export const pointerDown = (
  id: number,
  e: React.PointerEvent<HTMLElement>,
  parentRef: RefObject<HTMLDivElement | null>,
  draggedItemRef: RefObject<DraggedItemType | null>,
  setWidgetPlaceholder: SetStateType<WidgetDetailsType | null>,
  COL_WIDTH: number,
  ROW_HEIGHT: number
) => {
  e.currentTarget.setPointerCapture(e.pointerId);
  const widgetRect = e.currentTarget.getBoundingClientRect();
  const parentRect = parentRef.current?.getBoundingClientRect();

  const offsetX = e.clientX - widgetRect.left + (parentRect?.left ?? 0);
  const offsetY = e.clientY - widgetRect.top + (parentRect?.top ?? 0);

  draggedItemRef.current = { id, offsetX, offsetY };
  if (parentRect) {
    setWidgetPlaceholder({
      id,
      x: (widgetRect.left - parentRect.left) / COL_WIDTH,
      y: (widgetRect.top - parentRect.top) / ROW_HEIGHT,
      width: widgetRect.width / COL_WIDTH,
      height: widgetRect.height / ROW_HEIGHT,
    });
  }
};
