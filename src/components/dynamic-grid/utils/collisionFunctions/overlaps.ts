import { WidgetDetailsType, WidgetPlaceHolderType } from "../../types";

export function overlaps(a: WidgetPlaceHolderType, b: WidgetDetailsType) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
