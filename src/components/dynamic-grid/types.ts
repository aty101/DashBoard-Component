import { Dispatch, SetStateAction } from "react";

export type WidgetDetailsType = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};



export type SetStateType<T> = Dispatch<SetStateAction<T>>;
