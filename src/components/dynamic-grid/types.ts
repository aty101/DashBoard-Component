import { Dispatch, SetStateAction } from "react";

export type WidgetDetail = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DragPos = {
  id?: number;
  offsetX: number;
  offsetY: number;
};
export type FinalPos = {
  id: number;
  width: number;
  height: number;
  calculatedX: number;
  calculatedY: number;
};

export type SetStateType<T> = Dispatch<SetStateAction<T>>;
