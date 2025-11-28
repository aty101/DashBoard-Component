import { RefObject } from "react";
import { DragPos, FinalPos, SetStateType, WidgetDetail } from "./types";

export const mouseMove = (
  e: MouseEvent,
  draggedItemRef: RefObject<DragPos | null>,
  setWidgetsDetails: SetStateType<WidgetDetail[]>,
  setFinalPos: SetStateType<FinalPos | null>,
  COL_WIDTH: number,
  ROW_HEIGHT: number
) => {
  const newX = (e.clientX - draggedItemRef.current!.offsetX) / COL_WIDTH;
  const newY = (e.clientY - draggedItemRef.current!.offsetY) / ROW_HEIGHT;
  setWidgetsDetails((prev) =>
    prev.map((widget) => {
      if (!draggedItemRef.current) return widget;
      if (widget.id !== draggedItemRef.current.id) return widget;
      return {
        ...widget,
        x: newX,
        y: newY,
      };
    })
  );
  const newGridX = Math.round(newX);
  const newGridY = Math.round(newY);

  setFinalPos((prev) => {
    if (!prev) return prev;
    return { ...prev, calculatedX: newGridX, calculatedY: newGridY };
  });
};
