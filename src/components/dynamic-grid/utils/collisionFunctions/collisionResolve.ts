import { WidgetDetailsType, WidgetPlaceHolderType } from "../../types";
import { overlaps } from "./overlaps";

function binarySearchByY(arr: WidgetDetailsType[], y: number): number {
  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    const mid = (left + right) >> 1;
    if (arr[mid].y < y) left = mid + 1;
    else right = mid - 1;
  }
  return left;
}

export function collisionResolve(
  source: WidgetPlaceHolderType,
  widgetsByY: WidgetDetailsType[],
  widgets: WidgetDetailsType[]
) {
  // Define search bounds
  const searchStartIndex = binarySearchByY(widgetsByY, source.y - 150);
  const searchEndIndex = binarySearchByY(
    widgetsByY,
    source.y + source.height + 150
  );

  // Narrow search range
  const candidates = widgetsByY.slice(searchStartIndex, searchEndIndex);

  // Filter candidates for overlap, excluding source
  const collisions = candidates
    .filter((w) => w.id !== source.id && overlaps(source, w))
    .sort((a, b) => a.y - b.y);

  if (collisions.length === 0) return;

  let nextY = source.y + source.height;

  for (const widget of collisions) {
    widget.y = nextY;
    nextY += widget.height;

    collisionResolve(
      {
        id: widget.id,
        x: widget.x,
        y: widget.y,
        width: widget.width,
        height: widget.height,
      },
      widgetsByY,
      widgets
    );
  }
}
