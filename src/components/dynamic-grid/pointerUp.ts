import { RefObject } from "react";
import { DraggedItemType, SetStateType, WidgetDetailsType } from "./types";

export const pointerUp = (
  draggedItemRef: RefObject<DraggedItemType | null>,
  finalPosRef: RefObject<WidgetDetailsType | null>,
  animationId: RefObject<number | null>,
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>,
  setWidgetPlaceholder: SetStateType<WidgetDetailsType | null>
) => {
  if (finalPosRef.current) {
    setWidgetsDetails((prev) =>
      prev.map((widget) =>
        widget.id === finalPosRef.current!.id
          ? {
              ...widget,
              x: finalPosRef.current!.x,
              y: finalPosRef.current!.y,
            }
          : widget
      )
    );
  }
  setWidgetPlaceholder(null);
  draggedItemRef.current = null;
  if (animationId.current) {
    cancelAnimationFrame(animationId.current);
    animationId.current = null;
  }
};
