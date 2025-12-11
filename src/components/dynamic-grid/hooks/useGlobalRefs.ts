import { useMemo, useRef } from "react";
import { LimitsType, WidgetDetailsType, WidgetPlaceHolderType } from "../types";

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
  const limitsRef = useRef<LimitsType>({ maxCol: 0, maxRow: 0 });

  return useMemo(() => {
    return {
      parentRef,
      currentWidgetRef,
      widgetPlaceHolderRef,
      widgetsDetailsRef,
      animationId,
      limitsRef,
    };
  }, []);
}
