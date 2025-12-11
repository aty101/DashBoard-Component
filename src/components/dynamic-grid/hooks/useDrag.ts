import { useCallback, useEffect, useRef } from "react";

import {
  GlobalRefsType,
  SetStateType,
  WidgetDetailsType,
  WidgetPlaceHolderType,
} from "../types";
import {
  DraggingOffsetsObject,
  DragHandlersRefsType,
} from "../utils/draggingFunctions/draggingTypesAndParams";
import { draggingStart } from "../utils/draggingFunctions/draggingStart";
import { dragging } from "../utils/draggingFunctions/dragging/dragging";
import { draggingEnd } from "../utils/draggingFunctions/draggingEnd";

export function useDrag(
  globalRefs: GlobalRefsType,
  setWidgetPlaceholder: SetStateType<WidgetPlaceHolderType | null>,
  setWidgetsDetails: SetStateType<WidgetDetailsType[]>
) {
  // Declare drag init ref
  const draggingOffsetsRef = useRef<DraggingOffsetsObject>(null);

  // Ref to detect callbacks memory allocation
  const handlersRefs = useRef<DragHandlersRefsType>(null);

  // Fetch needed refs
  const { currentWidgetRef, widgetsDetailsRef } = globalRefs;

  // Handle initialization of (the offset of the cursor in the widget, the widget placeholder state, add eventlisteners)
  const handleDraggingStart = useCallback(
    (id: number, e: React.PointerEvent<HTMLElement>) => {
      if (draggingOffsetsRef.current) return;

      currentWidgetRef.current = widgetsDetailsRef.current.find(
        (w) => w.id === id
      )!;

      draggingStart({
        e,
        draggingOffsetsRef,
        handlersRefs,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Handle (detection of the cursor new position, setting placeholder and current widget to their new values)
  const handleDragging = useCallback(
    (e: PointerEvent) => {
      dragging({
        e,
        draggingOffsetsRef,
        globalRefs,
        setWidgetPlaceholder,
        setWidgetsDetails,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Handle (the resset of used refs and states, remove eventlisteners)
  const handleDraggingEnd = useCallback(
    () => {
      draggingEnd({
        draggingOffsetsRef,
        handlersRefs,
        globalRefs,
        setWidgetsDetails,
        setWidgetPlaceholder,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Detect if the handlers are ready or not
  useEffect(() => {
    handlersRefs.current = {
      handleDragging,
      handleDraggingEnd,
    };
  }, [handleDragging, handleDraggingEnd]);

  return handleDraggingStart;
}
