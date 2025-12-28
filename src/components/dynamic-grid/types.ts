import { Dispatch, ReactNode, RefObject, SetStateAction } from "react";

export type WidgetDetailsType = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  content: ReactNode;
};

export type WidgetPlaceHolderType = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GlobalRefsType = {
  parentRef: RefObject<HTMLDivElement | null>;
  currentWidgetRef: RefObject<WidgetDetailsType | null>;
  widgetPlaceHolderRef: RefObject<WidgetPlaceHolderType | null>;
  widgetsDetailsRef: RefObject<WidgetDetailsType[]>;
  animationId: RefObject<number | null>;
  maxColRef: RefObject<number>;
  gridSize: RefObject<GridSizeType>;
};

export type GridSizeType = {
  COL_WIDTH: number;
  ROW_HEIGHT: number;
  GAP: number;
};

export type SetStateType<T> = Dispatch<SetStateAction<T>>;
