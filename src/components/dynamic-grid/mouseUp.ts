import { DragPos, FinalPos, SetStateType, WidgetDetail } from "./types";

export const mouseUp = (
  finalPos: FinalPos,
  setDraggedItem: SetStateType<DragPos | null>,
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
  setDraggedItem(null);
  setFinalPos(null);
};
