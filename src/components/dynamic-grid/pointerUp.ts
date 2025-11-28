import { RefObject } from "react";
import { SetStateType, WidgetDetailsType } from "./types";

export const pointerUp = (
  draggedItemRef: RefObject<WidgetDetailsType | null>,
  finalPosRef: RefObject<WidgetDetailsType | null>,
  animationId: RefObject<number | null>,
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>,
  setWidgetPlaceholder: SetStateType<WidgetDetailsType | null>
) => {
  const ref = finalPosRef.current ? { ...finalPosRef.current } : null;
  if (ref) {
    setWidgetsDetails((prev) =>
      prev.map((widget) => {
        return widget.id === ref.id
          ? {
              ...widget,
              x: ref.x,
              y: ref.y,
            }
          : widget;
      })
    );
  }
  setWidgetPlaceholder(null);
  draggedItemRef.current = null;
  finalPosRef.current = null;
  if (animationId.current) {
    cancelAnimationFrame(animationId.current);
    animationId.current = null;
  }
};
