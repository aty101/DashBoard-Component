import { useMemo, useRef } from "react";
import {
  GridSizeType,
  WidgetDetailsType,
  WidgetPlaceHolderType,
} from "../types";

export function useGlobalRefs(widgetsDetails: WidgetDetailsType[]) {
  /* ...REFS DECLARATION... */

  // Parent ref
  const parentRef = useRef<HTMLDivElement>(null);

  // Current active widget details
  const currentWidgetRef = useRef<WidgetDetailsType>(null);

  // Current active widget placeholder details
  const widgetPlaceHolderRef = useRef<WidgetPlaceHolderType>(null);

  // Widget details ref used instead of the state in callbacks
  const widgetsDetailsRef = useRef<WidgetDetailsType[]>(widgetsDetails);

  // Animation id used to handle big states setters
  const animationId = useRef<number>(null);

  // Save the grid limits to be used in responsivablity
  const maxColRef = useRef<number>(0);

  const gridSize = useRef<GridSizeType>({
    COL_WIDTH: 0,
    ROW_HEIGHT: 0,
    GAP: 8,
  });

  return useMemo(() => {
    return {
      parentRef,
      currentWidgetRef,
      widgetPlaceHolderRef,
      widgetsDetailsRef,
      animationId,
      maxColRef,
      gridSize,
    };
  }, []);
}
