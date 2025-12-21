import { GlobalRefsType, GridSizeType, SetStateType } from "../../types";

export function createGridSizeObserver(
  globalRefs: GlobalRefsType,
  setLimitsState: SetStateType<number>,
  setGridSize: SetStateType<GridSizeType>
) {
  const { maxColRef, parentRef, gridSize } = globalRefs;
  if (!parentRef.current) return;
  const resizeObserver = new ResizeObserver((entries) => {
    const pageWidth = window.innerWidth;

    const { width } = entries[0].contentRect;

    const GAP = gridSize.current.GAP;

    let maxCol;

    if (pageWidth >= 1530) {
      maxCol = 12;
    } else if (pageWidth > 1330) {
      maxCol = 10;
    } else if (pageWidth > 1100) {
      maxCol = 6;
    } else if (pageWidth > 960) {
      maxCol = 4;
    } else {
      maxCol = 2;
    }

    const COL_WIDTH = (width - GAP * (maxCol - 1)) / maxCol;
    const ROW_HEIGHT = 150;

    gridSize.current = {
      COL_WIDTH,
      ROW_HEIGHT,
      GAP,
    };
    setGridSize({
      COL_WIDTH,
      ROW_HEIGHT,
      GAP,
    });

    const newMaxCol = maxCol;

    maxColRef.current = newMaxCol;

    setLimitsState((prev) => (prev === maxCol ? prev : maxCol));
    // You can use this sizeRef.current anywhere else without causing re-render
  });

  resizeObserver.observe(parentRef.current);
  return resizeObserver;
}
