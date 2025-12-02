import { WidgetDetailsType } from "../types";
import { siblingsCollisionParams } from "./collisionFunctionsParams";

const calcWidgetBoundings = (widget: WidgetDetailsType) => {
  const startX = widget.x;
  const endX = widget.x + widget.width - 1;

  const startY = widget.y;
  const endY = widget.y + widget.height - 1;

  return {
    startX,
    endX,
    startY,
    endY,
  };
};

function widgetsOverlap(a: WidgetDetailsType, b: WidgetDetailsType): boolean {
  const aLeft = a.x;
  const aRight = a.x + a.width;
  const aTop = a.y;
  const aBottom = a.y + a.height;

  const bLeft = b.x;
  const bRight = b.x + b.width;
  const bTop = b.y;
  const bBottom = b.y + b.height;

  return aLeft < bRight && aRight > bLeft && aTop < bBottom && aBottom > bTop;
}

function resolve(widgets: WidgetDetailsType[], moved: WidgetDetailsType) {
  let i = 0;

  while (i < widgets.length) {
    const w = widgets[i];

    if (w.id !== moved.id && widgetsOverlap(moved, w)) {
      w.y = moved.y + moved.height;
      moved = w; // continue down the chain
      i = 0; // restart scan
      continue;
    }

    i++;
  }

}

export const siblingsCollision = ({
  widgetPlaceHolderRef,
  widgetsDetailsRef,
  setWidgetsDetails,
}: siblingsCollisionParams) => {
  if (!widgetPlaceHolderRef.current) return;
 resolve(
    widgetsDetailsRef.current,
    widgetPlaceHolderRef.current
  );

  setWidgetsDetails(widgetsDetailsRef.current);
};
