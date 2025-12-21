import { WidgetDetailsType } from "../../types";
import { overlaps } from "./overlaps";

// Compact widgets upwards to fill empty vertical space
export function widgetsCompaction(
  currentWidget: WidgetDetailsType | null,
  widgets: WidgetDetailsType[]
) {
  // Sort widgets by x then y ascending
  // widgets.sort((a, b) => a.x - b.x || a.y - b.y);
  for (let i = 0; i < widgets.length; i++) {
    const widget = widgets[i];
    // if (widget.id === id) continue;
    let targetY = widget.y;

    while (true) {
      const collision = widgets.some((w) => {
        if (w.id === widget.id) return false;
        return overlaps({ ...widget, y: targetY - 1 }, w);
      });

      if (!collision && targetY != 0) {
        targetY--;
        continue;
      }
      widget.y = targetY;
      if (currentWidget && currentWidget.id === widget.id) {
        currentWidget.y = targetY;
      }
      break;
    }
  }
}
