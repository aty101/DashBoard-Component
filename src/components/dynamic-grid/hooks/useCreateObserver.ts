import { GridSizeType } from "./../types";
import { useEffect, useEffectEvent } from "react";
import { GlobalRefsType, SetStateType } from "../types";
import { createGridSizeObserver } from "../utils/responsiveGridFunctions/createGridSizeObserver";

export function useCreateObserver(
  globalRefs: GlobalRefsType,
  setMaxColState: SetStateType<number>,
  setGridSize: SetStateType<GridSizeType>
) {
  const attachSizeObserver = useEffectEvent(() => {
    const resizeObserver = createGridSizeObserver(
      globalRefs,
      setMaxColState,
      setGridSize
    );
    return resizeObserver;
  });
  useEffect(() => {
    const resizeObserver = attachSizeObserver();
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);
}
