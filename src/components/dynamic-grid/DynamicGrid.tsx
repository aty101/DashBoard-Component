"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { HandlersRefs, WidgetDetailsType } from "./types";
import { StableDataSection } from "./DataSection";
import { resize, resizeEnd, resizeStart } from "./resizeHandlers";
import { draggingStart } from "./draggingFunctions/draggingStart";
import { dragging } from "./draggingFunctions/dragging";
import { draggingEnd } from "./draggingFunctions/draggingEnd";
import { DraggingOffsetsObject } from "./draggingFunctions/draggingFunctionsParams";

const COL_WIDTH = 100;
const ROW_HEIGHT = 100;

export default function DynamicGrid() {
  const draggedItemRef = useRef<DraggingOffsetsObject>(null);
  const resizedItemRef = useRef<WidgetDetailsType>(null);
  const currentWidgetRef = useRef<WidgetDetailsType>(null);
  const widgetPlaceHolderRef = useRef<WidgetDetailsType>(null);
  const animationId = useRef<number>(null);

  const handlersRefs = useRef<HandlersRefs>(null);

  const [widgetsDetails, setWidgetsDetails] = useState<WidgetDetailsType[]>([
    { id: 1, x: 0, y: 0, width: 2, height: 2 },
    { id: 2, x: 3, y: 0, width: 2, height: 2 },
    { id: 3, x: 0, y: 3, width: 2, height: 2 },
    { id: 4, x: 3, y: 3, width: 2, height: 2 },
  ]);
  const widgetsDetailsRef = useRef<WidgetDetailsType[]>(widgetsDetails);

  useEffect(() => {
    widgetsDetailsRef.current = widgetsDetails;
  }, [widgetsDetails]);

  const [widgetPlaceholder, setWidgetPlaceholder] =
    useState<WidgetDetailsType | null>(null);

  const handleResizeStart = useCallback(
    (id: number, e: React.PointerEvent<HTMLElement>) => {
      resizeStart({
        id,
        e,
        resizedItemRef,
        widgetPlaceHolderRef,
        COL_WIDTH,
        ROW_HEIGHT,
        widgetsDetails,
      });

      if (handlersRefs.current) {
        window.addEventListener(
          "pointermove",
          handlersRefs.current.handleResize
        );
        window.addEventListener(
          "pointerup",
          handlersRefs.current.handleResizeEnd
        );
      }
    },
    [widgetsDetails]
  );
  const handleResize = useCallback((e: PointerEvent) => {
    resize({
      e,
      resizedItemRef,
      setWidgetsDetails,
      COL_WIDTH,
      ROW_HEIGHT,
      widgetPlaceHolderRef,
      setWidgetPlaceholder,
      animationId,
    });
  }, []);
  const handleResizeEnd = useCallback(() => {
    resizeEnd({
      resizedItemRef,
      widgetPlaceHolderRef,
      animationId,
      setWidgetPlaceholder,
      setWidgetsDetails,
    });
    if (handlersRefs.current) {
      window.removeEventListener(
        "pointermove",
        handlersRefs.current.handleResize
      );
      window.removeEventListener(
        "pointerup",
        handlersRefs.current.handleResizeEnd
      );
    }
  }, []);

  /* ...DRAGGING HANDLERS... */

  // Handle initialization of (the offset of the cursor in the widget, the widget placeholder state, add eventlisteners)
  const handleDraggingStart = useCallback(
    (id: number, e: React.PointerEvent<HTMLElement>) => {
      if (draggedItemRef.current) return;

      currentWidgetRef.current =
        widgetsDetailsRef.current.find((w) => w.id === id) ?? null;

      draggingStart({
        id,
        e,
        draggedItemRef,
        currentWidgetRef,
        handlersRefs,
        setWidgetPlaceholder,
      });
    },
    []
  );

  // Handle (detection of the cursor new position, setting placeholder and current widget to their new values)
  const handleDragging = useCallback((e: PointerEvent) => {
    dragging({
      e,
      draggedItemRef,
      currentWidgetRef,
      animationId,
      widgetPlaceHolderRef,
      setWidgetPlaceholder,
      setWidgetsDetails,
      COL_WIDTH,
      ROW_HEIGHT,
    });
  }, []);

  // Handle (the resset of used refs and states, remove eventlisteners)
  const handleDraggingEnd = useCallback(() => {
    draggingEnd({
      draggedItemRef,
      widgetPlaceHolderRef,
      animationId,
      handlersRefs,
      setWidgetsDetails,
      setWidgetPlaceholder,
    });
  }, []);

  /* ...CAPTURE CALLBACKS MEMORY LOCATIONS... */
  useEffect(() => {
    handlersRefs.current = {
      handleDragging,
      handleDraggingEnd,
      handleResize,
      handleResizeEnd,
    };
  }, [handleDragging, handleDraggingEnd, handleResize, handleResizeEnd]);

  return (
    <>
      <div className={`w-full relative p-2 `}>
        {widgetsDetails.map((widget) => {
          return (
            <StableDataSection
              key={widget.id}
              widget={widget}
              handlePointerDown={handleDraggingStart}
              COL_WIDTH={COL_WIDTH}
              ROW_HEIGHT={ROW_HEIGHT}
              isDragged={
                widget.id === widgetPlaceholder?.id &&
                widget.x != widgetPlaceholder.x &&
                widget.y != widgetPlaceholder.y
              }
              handleResizeStart={handleResizeStart}
            />
          );
        })}
        {widgetPlaceholder && (
          <div
            style={{
              width: widgetPlaceholder.width * COL_WIDTH,
              height: widgetPlaceholder.height * ROW_HEIGHT,
              transform: `translate(${widgetPlaceholder.x * COL_WIDTH}px,${
                widgetPlaceholder.y * ROW_HEIGHT
              }px)`,
            }}
            className="absolute bg-blue-300 inline-block  z-1 opacity-50
          cursor-grab "
          ></div>
        )}
      </div>
    </>
  );
}
