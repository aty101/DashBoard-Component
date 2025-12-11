import { COL_WIDTH, GAP, ROW_HEIGHT } from "../../grid-components/DynamicGrid";
import { GlobalRefsType, LimitsType, SetStateType } from "../../types";

export function createGridSizeObserver(
  globalRefs: GlobalRefsType,
  setLimitsState: SetStateType<LimitsType>
) {
  const { limitsRef, parentRef } = globalRefs;
  const resizeObserver = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect;

    const maxCol = Math.floor((width + GAP) / (COL_WIDTH + GAP)) - 1;
    const maxRow = Math.floor((height + GAP) / (ROW_HEIGHT + GAP) - 1);
    const newLimits = { maxCol, maxRow };

    limitsRef.current = newLimits;

    setLimitsState((prev) =>
      prev.maxCol === newLimits.maxCol && prev.maxRow === newLimits.maxRow
        ? prev
        : newLimits
    );
    // You can use this sizeRef.current anywhere else without causing re-render
  });

  if (parentRef.current) resizeObserver.observe(parentRef.current);
  return resizeObserver;
}
