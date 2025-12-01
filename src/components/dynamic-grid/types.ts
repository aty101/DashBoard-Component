import { Dispatch, RefObject, SetStateAction } from "react";

export type WidgetDetailsType = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};



export type HandlersRefs = {
  handleDragging: (e: PointerEvent) => void;
  handleDraggingEnd: () => void;
  handleResize: (e: PointerEvent) => void;
  handleResizeEnd: () => void;
};

export type SetStateType<T> = Dispatch<SetStateAction<T>>;
