import { RefObject } from "react";
import { DragPos, FinalPos, SetStateType } from "./types";

export const mouseDown = (
  id: number,
  e: React.MouseEvent<HTMLDivElement>,
  parentRef: RefObject<HTMLDivElement | null>,
  draggedItemRef: RefObject<DragPos | null>,
  setFinalPos: SetStateType<FinalPos | null>,
  COL_WIDTH: number,
  ROW_HEIGHT: number
) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const parent = parentRef.current!.getBoundingClientRect();

  const parentX = parent?.left;
  const parentY = parent?.top;

  const initX = e.clientX - rect.left + parentX;
  const initY = e.clientY - rect.top + parentY;

  draggedItemRef.current = { id, offsetX: initX, offsetY: initY };

  setFinalPos({
    id,
    width: rect.width,
    height: rect.height,
    calculatedX: initX,
    calculatedY: initY,
  });
};
