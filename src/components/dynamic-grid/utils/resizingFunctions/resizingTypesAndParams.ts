import { RefObject } from "react";

import {
  GlobalRefsType,
  GridSizeType,
  SetStateType,
  WidgetDetailsType,
  WidgetPlaceHolderType,
} from "../../types";

export type ResizeInitObject = {
  width: number;
  height: number;
  cursorGlobX: number;
  cursorGlobY: number;
};

export type ResizingStartParams = {
  e: React.PointerEvent<HTMLElement>;
  resizedItemRef: RefObject<ResizeInitObject | null>;
  handlersRefs: RefObject<ResizeHandlersRefsType | null>;
  globalRefs: GlobalRefsType;
};

export type ResizingParams = {
  e: PointerEvent;
  resizedItemRef: RefObject<ResizeInitObject | null>;
  globalRefs: GlobalRefsType;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  setWidgetPlaceholder: SetStateType<WidgetPlaceHolderType | null>;
};

export type ResizingEndParams = {
  resizedItemRef: RefObject<ResizeInitObject | null>;
  handlersRefs: RefObject<ResizeHandlersRefsType | null>;
  globalRefs: GlobalRefsType;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  setWidgetPlaceholder: SetStateType<WidgetPlaceHolderType | null>;
};

export type CalcNewSizeParams = {
  e: PointerEvent;
  initResizeData: ResizeInitObject;
  maxCols: number;

  currentWidget: WidgetDetailsType;
  gridSize: GridSizeType;
};

export type ResizeHandlersRefsType = {
  handleResize: (e: PointerEvent) => void;
  handleResizeEnd: () => void;
};
