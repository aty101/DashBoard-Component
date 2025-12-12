import { useContext } from "react";
import { COL_WIDTH, GAP, ROW_HEIGHT } from "./DynamicGrid";
import { GridContext } from "./GridContextProvider";

export default function Placeholder() {
  // Get the placeholder state from the context
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGridContext must be used within GridContextProvider");
  }
  const { widgetPlaceholder } = context;

  if (!widgetPlaceholder) return;
  /* ...DEFINE THE PLACEHOLDER STYLES... */

  // Calc the placeholder size
  const width =
    widgetPlaceholder.width * COL_WIDTH + GAP * (widgetPlaceholder.width - 1);
  const height =
    widgetPlaceholder.height * ROW_HEIGHT +
    GAP * (widgetPlaceholder.height - 1);

  // Calc the placeholder pos
  const x = widgetPlaceholder.x * (COL_WIDTH + GAP);
  const y = widgetPlaceholder.y * (ROW_HEIGHT + GAP);

  // Set the placeholder to its new pos
  const transform = `translate(${x}px,${y}px)`;

  return (
    <div
      style={{
        width,
        height,
        transform,
      }}
      className="absolute bg-blue-300 inline-block z-1 opacity-50 cursor-grab select-none duration-200"
    ></div>
  );
}
