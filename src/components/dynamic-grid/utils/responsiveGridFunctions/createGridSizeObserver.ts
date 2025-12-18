import { COL_WIDTH, GAP, ROW_HEIGHT } from "../../grid-components/DynamicGrid";
import {
  GlobalRefsType,
  GridSizeType,
  LimitsType,
  SetStateType,
} from "../../types";

export function createGridSizeObserver(
  globalRefs: GlobalRefsType,
  setLimitsState: SetStateType<LimitsType>,
  setGridSize: SetStateType<GridSizeType>
) {
  const { limitsRef, parentRef } = globalRefs;
  if (!parentRef.current) return;
  const resizeObserver = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect;
    setGridSize({
      COL_WIDTH: (width * 10) / 100,
      ROW_HEIGHT: (height * 10) / 100,
      GAP: 10,
    });

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

  resizeObserver.observe(parentRef.current);
  return resizeObserver;
}
