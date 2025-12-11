import { WidgetDetailsType, WidgetPlaceHolderType } from "../../types";
import { siblingsCollisionParams } from "./collisionFunctionsParams";

function widgetsOverlap(
  a: WidgetPlaceHolderType,
  b: WidgetDetailsType
): boolean {
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

function resolve(widgets: WidgetDetailsType[], moved: WidgetPlaceHolderType) {
  let hasCollision = true;

  while (hasCollision) {
    hasCollision = false;

    for (let i = 0; i < widgets.length; i++) {
      const w = widgets[i];

      if (w.id !== moved.id && widgetsOverlap(moved, w)) {
        console.log(w.id);
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
