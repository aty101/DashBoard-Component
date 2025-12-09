import { WidgetDetailsType } from "./../types";
import { siblingsCollision } from "../collisionFunctions/siblingsCollision";
import { COL_WIDTH, GAP, ROW_HEIGHT } from "../DynamicGrid";
import { DraggingParams } from "./draggingFunctionsParams";

export const dragging = ({
  e,
  draggedItemRef,
  animationId,
  widgetPlaceHolderRef,
  widgetsDetailsRef,
  setWidgetPlaceholder,
  setWidgetsDetails,
  currentWidgetRef,
  maxCols,
  maxRows,
}: DraggingParams) => {
  if (!draggedItemRef.current) return;
  const offsets = draggedItemRef.current;
  const currentWidget = currentWidgetRef.current!;

  const newX = (e.clientX - offsets.offsetX) / (COL_WIDTH + GAP);
  const newY = (e.clientY - offsets.offsetY) / (ROW_HEIGHT + GAP);

  // if (newX < 0) {
  //   newX = 0;
  // } else if (newX + currentWidget.width - 1 >= maxCols) {
  //   newX = maxCols - (currentWidget.width - 1);
  // }
  // if (newY < 0) {
  //   newY = 0;
  // } else if (newY + currentWidget.height - 1 >= maxRows) {
  //   newY = maxRows - (currentWidget.height - 1);
  // }

  const finalPosX = Math.round(newX);
  const finalPosY = Math.round(newY);

  const widgetPlaceHolder: WidgetDetailsType = {
    id: currentWidget.id,
    x: finalPosX,
    y: finalPosY,
    width: currentWidget.width,
    height: currentWidget.height,
    content: currentWidget.content,
  };

  widgetPlaceHolderRef.current = widgetPlaceHolder;

  setWidgetPlaceholder(widgetPlaceHolder);

  if (!animationId.current) {
    animationId.current = requestAnimationFrame(() => {
      widgetsDetailsRef.current = widgetsDetailsRef.current.map((widget) => {
        if (widget.id != currentWidget.id) return widget;

        return {
          ...widget,
          x: newX,
          y: newY,
        };
      });

      setWidgetsDetails([...widgetsDetailsRef.current]);
      animationId.current = null;
    });
  }
};
