import { Dispatch, RefObject, SetStateAction } from "react";

export type WidgetDetailsType = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
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
  limitsRef: RefObject<{
    maxCol: number;
    maxRow: number;
  }>;
};

export type GridSizeType = {
  COL_WIDTH: number;
  ROW_HEIGHT: number;
  GAP: number;
} | null;

export type LimitsType = { maxCol: number; maxRow: number };

export type SetStateType<T> = Dispatch<SetStateAction<T>>;
