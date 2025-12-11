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

  // Fetch global refs
  const {
    animationId,
    currentWidgetRef,
    limitsRef,
    widgetPlaceHolderRef,
    widgetsDetailsRef,
  } = globalRefs;

  // Resize Start handler (declare needed initial data)
  const handleResizeStart = useCallback(
    (id: number, e: React.PointerEvent<HTMLElement>) => {
      currentWidgetRef.current = widgetsDetailsRef.current.find(
        (w) => w.id == id
      )!;

      resizeStart({
        e,
        resizedItemRef,
        currentWidgetRef,
        handlersRefs,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Resize main logic
  const handleResize = useCallback(
    (e: PointerEvent) => {
      if (!resizedItemRef.current) return;
      resize({
        e,
        resizedItemRef,
        currentWidgetRef,
        widgetPlaceHolderRef,
        setWidgetPlaceholder,
        setWidgetsDetails,
        limitsRef,
        animationId,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Reset all used refs and placeholderstate
  const handleResizeEnd = useCallback(
    () => {
      resizeEnd({
        resizedItemRef,
        widgetPlaceHolderRef,
        animationId,
        setWidgetPlaceholder,
        setWidgetsDetails,
        handlersRefs,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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
