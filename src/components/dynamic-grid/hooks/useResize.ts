import { useCallback, useEffect, useRef } from "react";
import {
  GlobalRefsType,
  SetStateType,
  WidgetDetailsType,
  WidgetPlaceHolderType,
} from "../types";
import {
  ResizeHandlersRefsType,
  ResizeInitObject,
} from "../utils/resizingFunctions/resizingTypesAndParams";
import { resizeStart } from "../utils/resizingFunctions/resizingStart";
import { resize } from "../utils/resizingFunctions/resizing/resizing";
import { resizeEnd } from "../utils/resizingFunctions/resizingEnd";

export function useResize(
  globalRefs: GlobalRefsType,
  setWidgetPlaceholder: SetStateType<WidgetPlaceHolderType | null>,
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>
) {
  // Declare resize init ref
  const resizedItemRef = useRef<ResizeInitObject>(null);

  // Ref to detect callbacks memory allocation
  const handlersRefs = useRef<ResizeHandlersRefsType>(null);

  // Fetch needed refs
  const { currentWidgetRef, widgetsDetailsRef } = globalRefs;

  // Resize Start handler (declare needed initial data)
  const handleResizeStart = useCallback(
    (id: number, e: React.PointerEvent<HTMLElement>) => {
      currentWidgetRef.current = widgetsDetailsRef.current.find(
        (w) => w.id == id
      )!;

      resizeStart({
        e,
        resizedItemRef,
        handlersRefs,
        globalRefs,
      });
    },
    
    [currentWidgetRef, globalRefs, widgetsDetailsRef]
  );

  // Resize main logic
  const handleResize = useCallback(
    (e: PointerEvent) => {
      if (!resizedItemRef.current) return;
      resize({
        e,
        resizedItemRef,
        globalRefs,
        setWidgetPlaceholder,
        setWidgetsDetails,
      });
    },
    
    [globalRefs, setWidgetPlaceholder, setWidgetsDetails]
  );

  // Reset all used refs and placeholderstate
  const handleResizeEnd = useCallback(
    () => {
      resizeEnd({
        resizedItemRef,
        handlersRefs,
        globalRefs,
        setWidgetPlaceholder,
        setWidgetsDetails,
      });
    },
    
    [globalRefs, setWidgetPlaceholder, setWidgetsDetails]
  );

  // Detect if the callbacks are ready or not
  useEffect(() => {
    handlersRefs.current = {
      handleResize,
      handleResizeEnd,
    };
  }, [handleResize, handleResizeEnd]);

  return handleResizeStart;
}
