import { DragPos, FinalPos, SetStateType, WidgetDetail } from "./types";

export const mouseMove = (
  e: MouseEvent,
  draggedItem: DragPos,
  setWidgetsDetails: SetStateType<WidgetDetail[]>,
  setFinalPos: SetStateType<FinalPos | null>,
  COL_WIDTH: number,
  ROW_HEIGHT: number
) => {
  if (!draggedItem) return;

  const newX = (e.clientX / COL_WIDTH) - draggedItem.offsetX ;
  const newY = (e.clientY / ROW_HEIGHT) - draggedItem.offsetY;
  setWidgetsDetails((prev) =>
    prev.map((widget) => {
      if (widget.id !== draggedItem.id) return widget;
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
