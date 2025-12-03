
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
  COL_WIDTH,
  ROW_HEIGHT,
}: DraggingParams) => {
  if (!draggedItemRef.current) return;
  const offsets = draggedItemRef.current;
  const currentWidget = currentWidgetRef.current!;

  const newX = (e.clientX - offsets.offsetX) / COL_WIDTH;
  const newY = (e.clientY - offsets.offsetY) / ROW_HEIGHT;

  const finalPosX = Math.round(newX);
  const finalPosY = Math.round(newY);

  const widgetPlaceHolder = {
    id: currentWidget.id,
    x: finalPosX,
    y: finalPosY,
    width: currentWidget.width,
    height: currentWidget.height,
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
      // siblingsCollision({ widgetPlaceHolderRef, widgetsDetailsRef });
      setWidgetsDetails([...widgetsDetailsRef.current]);
      animationId.current = null;
    });
  }
};
