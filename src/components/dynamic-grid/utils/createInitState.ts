import React, { ReactNode } from "react";
import { WidgetDetailsType } from "../types";

export function createInitState(children: ReactNode) {
  let state: WidgetDetailsType[] = [];
  if (children) {
    let id = 1;
    let initX = 0;
    const initY = 0;

    const childrenArray = React.Children.toArray(children);

    state = childrenArray.map((child) => {
      const minWidth = child._owner.props["min-width"]
        ? parseInt(child._owner.props["min-width"])
        : 2;
      const minHeight = child._owner.props["min-height"]
        ? parseInt(child._owner.props["min-height"])
        : 1;

      const width = Math.max(2, minWidth);
      const height = Math.max(2, minHeight);
      const widget: WidgetDetailsType = {
        id,
        x: initX,
        y: initY,
        width,
        height,
        minWidth,
        minHeight,
        content: child,
      };
      id++;
      initX += width;

      return widget;
    });
  }
  return state;
}
