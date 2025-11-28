import { RefObject } from "react";
import { SetStateType, WidgetDetailsType } from "./types";

export const pointerDown = (
  id: number,
  e: React.PointerEvent<HTMLElement>,
  parentRef: RefObject<HTMLDivElement | null>,
  draggedItemRef: RefObject<WidgetDetailsType | null>,

  COL_WIDTH: number,
  ROW_HEIGHT: number
) => {
  e.currentTarget.setPointerCapture(e.pointerId);
  const widgetRect = e.currentTarget.getBoundingClientRect();
  const parentRect = parentRef.current?.getBoundingClientRect();

  const x = e.clientX - widgetRect.left + (parentRect?.left ?? 0);
  const y = e.clientY - widgetRect.top + (parentRect?.top ?? 0);

  draggedItemRef.current = {
    id,
    x,
    y,
    width: widgetRect.width / COL_WIDTH,
    height: widgetRect.height / ROW_HEIGHT,
  };
};
