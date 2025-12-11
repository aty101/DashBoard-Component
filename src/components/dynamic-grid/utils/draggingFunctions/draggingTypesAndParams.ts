import { RefObject } from "react";

import {
  LimitsType,
  SetStateType,
  WidgetDetailsType,
  WidgetPlaceHolderType,
} from "../../types";

export type DraggingOffsetsObject = {
  offsetX: number;
  offsetY: number;
};

export type DraggingStartParams = {
  e: React.PointerEvent<HTMLElement>;
  draggingOffsetsRef: RefObject<DraggingOffsetsObject | null>;
  handlersRefs: RefObject<DragHandlersRefsType | null>;
};

export type DraggingParams = {
  e: PointerEvent;
  draggingOffsetsRef: RefObject<DraggingOffsetsObject | null>;
  animationId: RefObject<number | null>;
  currentWidgetRef: RefObject<WidgetDetailsType | null>;
  widgetPlaceHolderRef: RefObject<WidgetPlaceHolderType | null>;
  setWidgetPlaceholder: SetStateType<WidgetPlaceHolderType | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  limitsRef: RefObject<LimitsType>;
};

export type DraggingEndParams = {
  draggingOffsetsRef: RefObject<DraggingOffsetsObject | null>;
  widgetPlaceHolderRef: RefObject<WidgetPlaceHolderType | null>;
  animationId: RefObject<number | null>;
  handlersRefs: RefObject<DragHandlersRefsType | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  setWidgetPlaceholder: SetStateType<WidgetPlaceHolderType | null>;
};
export type CalcNewPos = {
  e: PointerEvent;
  offsetX: number;
  offsetY: number;
  maxCols: number;
  maxRows: number;
  currentWidget: WidgetDetailsType;
};
export type DragHandlersRefsType = {
  handleDragging: (e: PointerEvent) => void;
  handleDraggingEnd: () => void;
};
