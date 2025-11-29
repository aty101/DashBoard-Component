import { RefObject } from "react";
import { SetStateType, WidgetDetailsType } from "./types";

export const pointerMove = (
  e: PointerEvent,
  draggedItemRef: RefObject<WidgetDetailsType | null>,
  animationId: RefObject<number | null>,
  finalPosRef: RefObject<WidgetDetailsType | null>,
  widgets: RefObject<WidgetDetailsType[]>,
  setWidgetPlaceholder: SetStateType<WidgetDetailsType | null>,
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>,
  COL_WIDTH: number,
  ROW_HEIGHT: number
) => {
  if (!draggedItemRef.current) return;
  const current = draggedItemRef.current;

  const newX = (e.clientX - current.x) / COL_WIDTH;
  const newY = (e.clientY - current.y) / ROW_HEIGHT;

  const finalPosX = Math.round(newX);
  const finalPosY = Math.round(newY);

  const placeHolder = {
    ...draggedItemRef.current,
    x: finalPosX,
    y: finalPosY,
  };

  if (finalPosRef) {
    finalPosRef.current = placeHolder;
  }
  setWidgetPlaceholder(placeHolder);
  if (!animationId.current) {
    animationId.current = requestAnimationFrame(() => {
      setWidgetsDetails((prev) => {
        const newWidgets = prev.map((widget) => {
          if (widget.id != draggedItemRef.current?.id) return widget;

          return {
            ...widget,
            x: newX,
            y: newY,
          };
        });

        return newWidgets;
      });
      animationId.current = null;
    });
  }
};
