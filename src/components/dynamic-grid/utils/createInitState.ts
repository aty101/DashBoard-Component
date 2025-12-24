import React, { ReactNode } from "react";
import { WidgetDetailsType } from "../types";

export function createInitState(children: ReactNode) {
  let state: WidgetDetailsType[] = [];
  if (children) {
    let id = 1;
    let initX = 0;
    const initY = 0;
    const width = 2;
    const height = 2;

    const childrenArray = React.Children.toArray(children);
    console.log(childrenArray);
    state = childrenArray.map((child) => {
      const widget: WidgetDetailsType = {
        id,
        x: initX,
        y: initY,
        width,
        height,
        content: child,
      };
      id++;
      initX += 2;

      return widget;
    });
  }
  return state;
}
