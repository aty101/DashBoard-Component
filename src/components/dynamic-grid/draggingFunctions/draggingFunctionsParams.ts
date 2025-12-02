import { RefObject } from "react";
import { HandlersRefsType, SetStateType, WidgetDetailsType } from "../types";

export type DraggingOffsetsObject = {
  id: number;
  offsetX: number;
  offsetY: number;
};

export type DraggingStartParams = {
  id: number;
  e: React.PointerEvent<HTMLElement>;
  draggedItemRef: RefObject<DraggingOffsetsObject | null>;
  currentWidgetRef: RefObject<WidgetDetailsType | null>;
  handlersRefs: RefObject<HandlersRefsType | null>;
  setWidgetPlaceholder: SetStateType<WidgetDetailsType | null>;
};

export type DraggingParams = {
  e: PointerEvent;
  draggedItemRef: RefObject<DraggingOffsetsObject | null>;
  animationId: RefObject<number | null>;
  widgetsDetailsRef: RefObject<WidgetDetailsType[]>;
  currentWidgetRef: RefObject<WidgetDetailsType | null>;
  widgetPlaceHolderRef: RefObject<WidgetDetailsType | null>;
  setWidgetPlaceholder: SetStateType<WidgetDetailsType | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  COL_WIDTH: number;
  ROW_HEIGHT: number;
};

export type DraggingEndParams = {
  draggedItemRef: RefObject<DraggingOffsetsObject | null>;
  widgetPlaceHolderRef: RefObject<WidgetDetailsType | null>;
  animationId: RefObject<number | null>;
  handlersRefs: RefObject<HandlersRefsType | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  setWidgetPlaceholder: SetStateType<WidgetDetailsType | null>;
};
