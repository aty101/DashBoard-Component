import { RefObject } from "react";
import {
  HandlersRefsType,
  SetStateType,
  WidgetDetailsType,
  WidgetPlaceHolderType,
} from "../types";

export type DraggingOffsetsObject = {
  id: number;
  offsetX: number;
  offsetY: number;
};

export type DraggingStartParams = {
  id: number;
  e: React.PointerEvent<HTMLElement>;
  draggingOffsetsRef: RefObject<DraggingOffsetsObject | null>;
  handlersRefs: RefObject<HandlersRefsType | null>;
};

export type DraggingParams = {
  e: PointerEvent;
  draggingOffsetsRef: RefObject<DraggingOffsetsObject | null>;
  animationId: RefObject<number | null>;
  currentWidgetRef: RefObject<WidgetDetailsType | null>;
  widgetPlaceHolderRef: RefObject<WidgetPlaceHolderType | null>;
  setWidgetPlaceholder: SetStateType<WidgetPlaceHolderType | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  maxCols: number;
  maxRows: number;
};

export type DraggingEndParams = {
  draggingOffsetsRef: RefObject<DraggingOffsetsObject | null>;
  widgetPlaceHolderRef: RefObject<WidgetPlaceHolderType | null>;
  animationId: RefObject<number | null>;
  handlersRefs: RefObject<HandlersRefsType | null>;
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>;
  setWidgetPlaceholder: SetStateType<WidgetPlaceHolderType | null>;
};
