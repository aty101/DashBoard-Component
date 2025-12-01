import { RefObject } from "react";
import { SetStateType, WidgetDetailsType } from "./types";

export const resizeStart = ({
  id,
  e,
  resizedItemRef,
  widgetPlaceHolderRef,
  COL_WIDTH,
  ROW_HEIGHT,
  widgetsDetails,
}: {
  id: number;
  e: React.PointerEvent<HTMLElement>;
  resizedItemRef: RefObject<WidgetDetailsType | null>;
  widgetPlaceHolderRef: RefObject<WidgetDetailsType | null>;
  COL_WIDTH: number;
  ROW_HEIGHT: number;
  widgetsDetails: WidgetDetailsType[];
}) => {
  e.currentTarget.setPointerCapture(e.pointerId);
  const rect = e.currentTarget.parentElement?.getBoundingClientRect();

  

  const widgetData = widgetsDetails.find((w) => w.id === id);
  resizedItemRef.current = {
    id,
    width: rect!.width,
    height: rect!.height,
    x: e.clientX,
    y: e.clientY,
  };

  widgetPlaceHolderRef.current = {
    id,
    width: widgetData!.width,
    height: widgetData!.height,
    x: widgetData!.x,
    y: widgetData!.y,
  };
};

export const resize = ({
  e,
  resizedItemRef,
  widgetPlaceHolderRef,
  animationId,
  setWidgetsDetails,
  setWidgetPlaceholder,
  COL_WIDTH,
  ROW_HEIGHT,
}: {
  e: PointerEvent;
  resizedItemRef: RefObject<WidgetDetailsType | null>;
  widgetPlaceHolderRef: RefObject<WidgetDetailsType | null>;
  animationId: RefObject<number | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  setWidgetPlaceholder: SetStateType<WidgetDetailsType | null>;
  COL_WIDTH: number;
  ROW_HEIGHT: number;
}) => {
  if (!resizedItemRef.current) return;
  const current = resizedItemRef.current;

  const newWidth = (current.width + e.clientX - current.x) / COL_WIDTH;
  const newHeight = (current.height + e.clientY - current.y) / ROW_HEIGHT;

  const finalPos = widgetPlaceHolderRef.current;

  if (finalPos) {
    widgetPlaceHolderRef.current = {
      ...finalPos,
      width: Math.ceil(newWidth),
      height: Math.ceil(newHeight),
    };
    setWidgetPlaceholder({
      ...finalPos,
      width: Math.ceil(newWidth),
      height: Math.ceil(newHeight),
    });
  }

  if (!animationId.current) {
    animationId.current = requestAnimationFrame(() => {
      setWidgetsDetails((prev) =>
        prev.map((widget) => {
          if (widget.id === current.id) {
            return {
              ...widget,
              width: Math.max(newWidth, 1),
              height: Math.max(newHeight, 1),
            };
          } else {
            return widget;
          }
        })
      );
      animationId.current = null;
    });
  }
};

export const resizeEnd = ({
  resizedItemRef,
  widgetPlaceHolderRef,
  animationId,
  setWidgetPlaceholder,
  setWidgetsDetails,
}: {
  resizedItemRef: RefObject<WidgetDetailsType | null>;
  widgetPlaceHolderRef: RefObject<WidgetDetailsType | null>;
  animationId: RefObject<number | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  setWidgetPlaceholder: SetStateType<WidgetDetailsType | null>;
}) => {
  const finalPos = widgetPlaceHolderRef.current;

  if (finalPos) {
    setWidgetsDetails((prev) =>
      prev.map((widget) => {
        if (widget.id === finalPos.id) {
          return {
            ...widget,
            width: Math.max(finalPos.width, 1),
            height: Math.max(finalPos.height, 1),
          };
        } else {
          return widget;
        }
      })
    );
  }
  if (animationId.current) {
    cancelAnimationFrame(animationId.current);
    animationId.current = null;
  }
  setWidgetPlaceholder(null);
  resizedItemRef.current = null;
  widgetPlaceHolderRef.current = null;
};
