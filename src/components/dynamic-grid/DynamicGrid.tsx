"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HandlersRefsType,
  WidgetDetailsType,
  WidgetPlaceHolderType,
} from "./types";
import { StableDataSection } from "./DataSection";
import { draggingStart } from "./draggingFunctions/draggingStart";
import { dragging } from "./draggingFunctions/dragging";
import { draggingEnd } from "./draggingFunctions/draggingEnd";
import { DraggingOffsetsObject } from "./draggingFunctions/draggingFunctionsParams";
import { resizeStart } from "./resizingFunctions/resizingStart";
import { resize } from "./resizingFunctions/resizing";
import { resizeEnd } from "./resizingFunctions/resizingEnd";
import { ResizeInitObject } from "./resizingFunctions/resizingFunctionsParams";

export const COL_WIDTH = 100;
export const ROW_HEIGHT = 100;
export const GAP = 10;

export default function DynamicGrid() {
  /* ...STATES DECLARATION... */

  // Widgets state
  const [widgetsDetails, setWidgetsDetails] = useState<WidgetDetailsType[]>([
    { id: 1, x: 0, y: 0, width: 2, height: 2, content: "data1" },
    { id: 2, x: 2, y: 0, width: 2, height: 2, content: "data2" },
    { id: 3, x: 0, y: 2, width: 2, height: 2, content: "data3" },
    { id: 4, x: 2, y: 2, width: 2, height: 2, content: "data4" },
  ]);

  // Current active widget placeholder and final position
  const [widgetPlaceholder, setWidgetPlaceholder] =
    useState<WidgetPlaceHolderType | null>(null);

  /* ...REFS DECLARATION... */

  // Parent ref
  const parentRef = useRef<HTMLDivElement>(null);

  // Dragging initial cursor offset object
  const draggingOffsetsRef = useRef<DraggingOffsetsObject>(null);

  // Resizing initial dimensions and cursor global start position
  const resizedItemRef = useRef<ResizeInitObject>(null);

  // Current active widget details
  const currentWidgetRef = useRef<WidgetDetailsType>(null);

  // Current active widget placeholder details
  const widgetPlaceHolderRef = useRef<WidgetPlaceHolderType>(null);

  // Animation id used to handle big states setters
  const animationId = useRef<number>(null);

  // Pointer move and pointer up handleres memory location
  const handlersRefs = useRef<HandlersRefsType>(null);

  // Widget details ref used instead of the state in callbacks
  const widgetsDetailsRef = useRef<WidgetDetailsType[]>(widgetsDetails);

  const limitsRef = useRef({ maxCol: 0, maxRow: 0 });

  const [limitsState, setLimitsState] = useState({ maxCol: 0, maxRow: 0 });

  useEffect(() => {
    if (!parentRef.current) return;
    const parentStyles = window.getComputedStyle(parentRef.current);
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;

      const paddingLeft = parseInt(parentStyles.paddingLeft);
      const paddingRight = parseInt(parentStyles.paddingRight);
      const paddingTop = parseInt(parentStyles.paddingTop);
      const paddingBottom = parseInt(parentStyles.paddingBottom);

      const maxCol = Math.floor((width + GAP) / (COL_WIDTH + GAP)) - 1;
      const maxRow = Math.floor((height + GAP) / (ROW_HEIGHT + GAP) - 1);
      const newLimits = { maxCol, maxRow };
      console.log(maxRow);

      limitsRef.current = newLimits;

      setLimitsState((prev) =>
        prev.maxCol === newLimits.maxCol && prev.maxRow === newLimits.maxRow
          ? prev
          : newLimits
      );
      // You can use this sizeRef.current anywhere else without causing re-render
    });

    resizeObserver.observe(parentRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // const handleResizeStart = useCallback(
  //   (id: number, e: React.PointerEvent<HTMLElement>) => {
  //     currentWidgetRef.current = widgetsDetailsRef.current.find(
  //       (w) => w.id == id
  //     )!;

  //     resizeStart({
  //       id,
  //       e,
  //       resizedItemRef,
  //       widgetPlaceHolderRef,
  //       COL_WIDTH,
  //       ROW_HEIGHT,
  //       currentWidgetRef,
  //       handlersRefs,
  //     });
  //   },
  //   []
  // );
  // const handleResize = useCallback((e: PointerEvent) => {
  //   if (!resizedItemRef) return;
  //   resize({
  //     e,
  //     resizedItemRef,
  //     setWidgetsDetails,
  //     currentWidgetRef,
  //     maxCols:limitsRef.current.maxCol,
  //     maxRows:limitsRef.current.maxRow,
  //     widgetPlaceHolderRef,
  //     setWidgetPlaceholder,
  //     animationId,
  //   });
  // }, []);
  // const handleResizeEnd = useCallback(() => {
  //   resizeEnd({
  //     resizedItemRef,
  //     widgetPlaceHolderRef,
  //     animationId,
  //     setWidgetPlaceholder,
  //     setWidgetsDetails,
  //     handlersRefs,
  //   });
  // }, []);

  /* ...DRAGGING HANDLERS... */

  // Handle initialization of (the offset of the cursor in the widget, the widget placeholder state, add eventlisteners)
  const handleDraggingStart = useCallback(
    (id: number, e: React.PointerEvent<HTMLElement>) => {
      if (draggingOffsetsRef.current) return;

      currentWidgetRef.current = widgetsDetailsRef.current.find(
        (w) => w.id === id
      )!;

      draggingStart({
        id,
        e,
        draggingOffsetsRef,
        handlersRefs,
      });
    },
    []
  );

  // Handle (detection of the cursor new position, setting placeholder and current widget to their new values)
  const handleDragging = useCallback((e: PointerEvent) => {
    dragging({
      e,
      draggingOffsetsRef,
      currentWidgetRef,
      animationId,
      widgetPlaceHolderRef,
      setWidgetPlaceholder,
      setWidgetsDetails,
      maxCols: limitsRef.current.maxCol,
      maxRows: limitsRef.current.maxRow,
    });
  }, []);

  // Handle (the resset of used refs and states, remove eventlisteners)
  const handleDraggingEnd = useCallback(() => {
    draggingEnd({
      draggingOffsetsRef,
      widgetPlaceHolderRef,
      animationId,
      handlersRefs,
      setWidgetsDetails,
      setWidgetPlaceholder,
    });
  }, []);

  /* ...EFFECT TO CAPTURE  MEMORY LOCATIONS AND STATES CHANGES... */

  // Track callbacks memory allocation
  useEffect(() => {
    handlersRefs.current = {
      handleDragging,
      handleDraggingEnd,
      // handleResize,
      // handleResizeEnd,
    };
  }, [handleDragging, handleDraggingEnd]);

  // Track widgets detailes state change
  useEffect(() => {
    widgetsDetailsRef.current = widgetsDetails;
  }, [widgetsDetails]);

  return (
    <>
      <div
        className={`max-w-full w-full relative overflow-x-hidden p-2 pr-0`}
        ref={parentRef}
      >
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
                (widget.x != widgetPlaceholder.x ||
                  widget.y != widgetPlaceholder.y)
              }
              // handleResizeStart={handleResizeStart}
            />
          );
        })}
        {widgetPlaceholder && (
          <div
            style={{
              width:
                widgetPlaceholder.width * COL_WIDTH +
                GAP * (widgetPlaceholder.width - 1),
              height:
                widgetPlaceholder.height * ROW_HEIGHT +
                GAP * (widgetPlaceholder.height - 1),
              transform: `translate(${
                widgetPlaceholder.x * (COL_WIDTH + GAP)
              }px,${widgetPlaceholder.y * (ROW_HEIGHT + GAP)}px)`,
            }}
            className="absolute bg-blue-300 inline-block z-1 opacity-50
          cursor-grab"
          ></div>
        )}
      </div>
    </>
  );
}
