import { RefObject } from "react";
import {
  HandlersRefsType,
  SetStateType,
  WidgetDetailsType,
  WidgetPlaceHolderType,
} from "../types";

export type ResizeInitObject = {
  width: number;
  height: number;
  cursorGlobX: number;
  cursorGlobY: number;
};

export type ResizingStartParams = {
  e: React.PointerEvent<HTMLElement>;
  resizedItemRef: RefObject<ResizeInitObject | null>;
  currentWidgetRef: RefObject<WidgetDetailsType | null>;
  handlersRefs: RefObject<HandlersRefsType | null>;
};

export type ResizingParams = {
  e: PointerEvent;
  resizedItemRef: RefObject<ResizeInitObject | null>;
  widgetPlaceHolderRef: RefObject<WidgetPlaceHolderType | null>;
  currentWidgetRef: RefObject<WidgetDetailsType | null>;
  animationId: RefObject<number | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  setWidgetPlaceholder: SetStateType<WidgetPlaceHolderType | null>;
  maxCols: number;
  maxRows: number;
};

export type ResizingEndParams = {
  resizedItemRef: RefObject<ResizeInitObject | null>;
  widgetPlaceHolderRef: RefObject<WidgetPlaceHolderType | null>;
  animationId: RefObject<number | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  setWidgetPlaceholder: SetStateType<WidgetPlaceHolderType | null>;
  handlersRefs: RefObject<HandlersRefsType | null>;
};
