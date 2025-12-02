import { RefObject } from "react";
import { HandlersRefsType, SetStateType, WidgetDetailsType } from "../types";

export type ResizingStartParams = {
  id: number;
  e: React.PointerEvent<HTMLElement>;
  resizedItemRef: RefObject<WidgetDetailsType | null>;
  widgetPlaceHolderRef: RefObject<WidgetDetailsType | null>;
  COL_WIDTH: number;
  ROW_HEIGHT: number;
  currentWidgetRef: RefObject<WidgetDetailsType | null>;
  handlersRefs: RefObject<HandlersRefsType | null>;
};

export type ResizingParams = {
  e: PointerEvent;
  resizedItemRef: RefObject<WidgetDetailsType | null>;
  widgetPlaceHolderRef: RefObject<WidgetDetailsType | null>;
  animationId: RefObject<number | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  setWidgetPlaceholder: SetStateType<WidgetDetailsType | null>;
  COL_WIDTH: number;
  ROW_HEIGHT: number;
};

export type ResizingEndParams = {
  resizedItemRef: RefObject<WidgetDetailsType | null>;
  widgetPlaceHolderRef: RefObject<WidgetDetailsType | null>;
  animationId: RefObject<number | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  setWidgetPlaceholder: SetStateType<WidgetDetailsType | null>;
  handlersRefs: RefObject<HandlersRefsType | null>;
};
