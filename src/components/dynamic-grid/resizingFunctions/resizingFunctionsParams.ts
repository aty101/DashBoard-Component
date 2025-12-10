import { RefObject } from "react";
import { HandlersRefsType, SetStateType, WidgetDetailsType } from "../types";

export type ResizeInitObject = {
  id: number;
  width: number;
  height: number;
  cursorGlobX: number;
  cursorGlobY: number;
};

export type ResizingStartParams = {
  id: number;
  e: React.PointerEvent<HTMLElement>;
  resizedItemRef: RefObject<ResizeInitObject | null>;
  widgetPlaceHolderRef: RefObject<WidgetDetailsType | null>;
  COL_WIDTH: number;
  ROW_HEIGHT: number;
  currentWidgetRef: RefObject<WidgetDetailsType | null>;
  handlersRefs: RefObject<HandlersRefsType | null>;
};

export type ResizingParams = {
  e: PointerEvent;
  resizedItemRef: RefObject<ResizeInitObject | null>;
  widgetPlaceHolderRef: RefObject<WidgetDetailsType | null>;
  currentWidgetRef: RefObject<WidgetDetailsType | null>;
  animationId: RefObject<number | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  setWidgetPlaceholder: SetStateType<WidgetDetailsType | null>;
  maxCols: number;
  maxRows: number;
};

export type ResizingEndParams = {
  resizedItemRef: RefObject<ResizeInitObject | null>;
  widgetPlaceHolderRef: RefObject<WidgetDetailsType | null>;
  animationId: RefObject<number | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  setWidgetPlaceholder: SetStateType<WidgetDetailsType | null>;
  handlersRefs: RefObject<HandlersRefsType | null>;
};
