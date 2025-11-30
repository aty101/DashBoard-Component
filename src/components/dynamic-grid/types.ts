import { Dispatch, RefObject, SetStateAction } from "react";

export type WidgetDetailsType = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PointerDownParams = {
  id: number;
  e: React.PointerEvent<HTMLElement>;
  parentRef: RefObject<HTMLDivElement | null>;
  draggedItemRef: RefObject<WidgetDetailsType | null>;
  COL_WIDTH: number;
  ROW_HEIGHT: number;
};

export type PointerMoveParams = {
  e: PointerEvent;
  draggedItemRef: RefObject<WidgetDetailsType | null>;
  animationId: RefObject<number | null>;
  finalPosRef: RefObject<WidgetDetailsType | null>;
  setWidgetPlaceholder: SetStateType<WidgetDetailsType | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  COL_WIDTH: number;
  ROW_HEIGHT: number;
};

export type PointerUpParams = {
  draggedItemRef: RefObject<WidgetDetailsType | null>;
  finalPosRef: RefObject<WidgetDetailsType | null>;
  animationId: RefObject<number | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  setWidgetPlaceholder: SetStateType<WidgetDetailsType | null>;
};

export type HandlersRefs = {
  handlePointerMoveRef: (e: PointerEvent) => void;
  handlePointUpRef: () => void;
};

export type SetStateType<T> = Dispatch<SetStateAction<T>>;
