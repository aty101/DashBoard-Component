import { Dispatch, SetStateAction } from "react";

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

export type HandlersRefsType = {
  handleDragging: (e: PointerEvent) => void;
  handleDraggingEnd: () => void;
  handleResize: (e: PointerEvent) => void;
  handleResizeEnd: () => void;
};

export type SetStateType<T> = Dispatch<SetStateAction<T>>;
