import { WidgetDetailsType, WidgetPlaceHolderType } from "../../types";
import { siblingsCollisionParams } from "./collisionFunctionsParams";

function widgetsOverlap(a: WidgetPlaceHolderType, b: WidgetDetailsType) {
  const aLeft = a.x;
  const aRight = a.x + a.width;
  const aTop = a.y;
  const aBottom = a.y + a.height;

  const bLeft = b.x;
  const bRight = b.x + b.width;
  const bTop = b.y;
  const bBottom = b.y + b.height;

  const collision =
    aLeft < bRight && aRight > bLeft && aTop < bBottom && aBottom > bTop;

  return collision;
}

function resolve(widgets: WidgetDetailsType[], moved: WidgetPlaceHolderType) {
  let hasCollision = true;

  while (hasCollision) {
    hasCollision = false;

    for (let i = 0; i < widgets.length; i++) {
      const w = widgets[i];
      const isOverlapping = widgetsOverlap(moved, w);
      if (w.id !== moved.id && isOverlapping) {
        // Push widget 'w' down
        w.y = moved.y + moved.height;

        // Now the widget 'w' might cause more collisions, so update moved pointer
        moved = w;

        hasCollision = true;

        // Break to restart the scan from beginning to catch all overlaps
        break;
      }
    }
  }
}

export const siblingsCollision = ({
  widgetPlaceholder,
  widgetsDetails,
}: siblingsCollisionParams) => {
  resolve(widgetsDetails, widgetPlaceholder);
};
