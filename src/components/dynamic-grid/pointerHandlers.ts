import { PointerDownParams } from "./types";

export const pointerDown = ({
  id,
  e,
  parentRef,
  draggedItemRef,
  COL_WIDTH,
  ROW_HEIGHT,
}: PointerDownParams) => {
  e.currentTarget.setPointerCapture(e.pointerId);

  const widgetRect = e.currentTarget.getBoundingClientRect();
  const parentRect = parentRef.current?.getBoundingClientRect();

  const x = e.clientX - widgetRect.left + (parentRect?.left ?? 0);
  const y = e.clientY - widgetRect.top + (parentRect?.top ?? 0);

  draggedItemRef.current = {
    id,
    x,
    y,
    width: widgetRect.width / COL_WIDTH,
    height: widgetRect.height / ROW_HEIGHT,
  };
};

import { PointerMoveParams } from "./types";

export const pointerMove = ({
  e,
  draggedItemRef,
  animationId,
  finalPosRef,
  setWidgetPlaceholder,
  setWidgetsDetails,
  COL_WIDTH,
  ROW_HEIGHT,
}: PointerMoveParams) => {
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

import { PointerUpParams } from "./types";

export const pointerUp = ({
  draggedItemRef,
  finalPosRef,
  animationId,
  setWidgetsDetails,
  setWidgetPlaceholder,
}: PointerUpParams) => {
  const saveFinalPos = finalPosRef.current ? { ...finalPosRef.current } : null;
  if (saveFinalPos) {
    setWidgetsDetails((prev) =>
      prev.map((widget) => {
        return widget.id === saveFinalPos.id
          ? {
              ...widget,
              x: saveFinalPos.x,
              y: saveFinalPos.y,
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
