import { RefObject } from "react";
import { DragPos, FinalPos, SetStateType } from "./types";

export const mouseDown = (
  id: number,
  e: React.MouseEvent<HTMLDivElement>,
  parentRef: RefObject<HTMLDivElement | null>,
  setDraggedItem: SetStateType<DragPos | null>,
  setFinalPos: SetStateType<FinalPos | null>,
  COL_WIDTH: number,
  ROW_HEIGHT: number
) => {
  const rect = e.currentTarget.getBoundingClientRect();
  console.log(
    `CursorX : ${e.clientX}\nCursorY : ${e.clientY}\nDivX : ${rect.left}\nDivY : ${rect.top}`
  );
  let parentX;
  let parentY;
  if (parentRef) {
    const parent = parentRef.current?.getBoundingClientRect();
    parentX = parent?.left;
    parentY = parent?.top;
  }

  const initX = (e.clientX - rect.left + (parentX ?? 0)) / COL_WIDTH;
  const initY = (e.clientY - rect.top + (parentY ?? 0)) / ROW_HEIGHT;

  setDraggedItem({
    id,
    offsetX: initX,
    offsetY: initY,
  });

  setFinalPos({
    id,
    width: rect.width,
    height: rect.height,
    calculatedX:
      Math.round((rect.left - (parentX ?? 0)) / COL_WIDTH) ,
    calculatedY:
      Math.round((rect.top - (parentY ?? 0)) / ROW_HEIGHT) ,
  });

};
