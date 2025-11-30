import { RefObject } from "react";
import { SetStateType, WidgetDetailsType } from "./types";

export const resize = ({
  e,
  draggedItemRef,
  setWidgetsDetails,
  COL_WIDTH,
  ROW_HEIGHT,
}: {
  e: PointerEvent;
  draggedItemRef: RefObject<WidgetDetailsType | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  COL_WIDTH: number;
  ROW_HEIGHT: number;
}) => {
  if (!draggedItemRef.current) return;
  const current = draggedItemRef.current;
  const newWidth = current.width + (e.clientX - current.x) / COL_WIDTH;
  const newHeight = current.height + (e.clientY - current.y) / ROW_HEIGHT;

  draggedItemRef.current = { ...current, width: newWidth, height: newHeight };

  setWidgetsDetails((prev) =>
    prev.map((widget) => {
      if (widget.id === current.id) {
        return { ...widget, width: newWidth, height: newHeight };
      } else {
        return widget;
      }
    })
  );
};
