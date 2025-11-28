import { RefObject } from "react";
import { DragPos, FinalPos, SetStateType, WidgetDetail } from "./types";

export const mouseUp = (
  finalPos: FinalPos,
  draggedItemRef: RefObject<DragPos | null>,
  setFinalPos: SetStateType<FinalPos | null>,
  setWidgetsDetails: SetStateType<WidgetDetail[]>
) => {
  setWidgetsDetails((prev) =>
    prev.map((widget) => {
      console.log(finalPos);
      if (widget.id !== finalPos.id) return widget;
      return {
        ...widget,
        x: finalPos.calculatedX,
        y: finalPos.calculatedY,
      };
    })
  );
  draggedItemRef.current = null;
  setFinalPos(null);
};
