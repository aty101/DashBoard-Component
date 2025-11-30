"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { HandlersRefs, WidgetDetailsType } from "./types";
import { pointerDown, pointerMove, pointerUp } from "./pointerHandlers";

import { StableDataSection } from "./DataSection";
import { resize } from "./resizeHandlers";

const COL_NUM = 12;
const COL_WIDTH = 100;
const ROW_HEIGHT = 100;

export default function DynamicGrid() {
  const parentRef = useRef<HTMLDivElement>(null);
  const draggedItemRef = useRef<WidgetDetailsType>(null);
  const finalPosRef = useRef<WidgetDetailsType>(null);
  const animationId = useRef<number>(null);

  const handlersRefs = useRef<HandlersRefs>(null);

  const [widgetsDetails, setWidgetsDetails] = useState<WidgetDetailsType[]>([
    { id: 1, x: 0, y: 0, width: 2, height: 2 },
    { id: 2, x: 3, y: 0, width: 2, height: 2 },
    { id: 3, x: 0, y: 3, width: 2, height: 2 },
    { id: 4, x: 3, y: 3, width: 2, height: 2 },
  ]);

  const [widgetPlaceholder, setWidgetPlaceholder] =
    useState<WidgetDetailsType | null>(null);

  const handleResize = useCallback((e: PointerEvent) => {
    resize({ e, draggedItemRef, setWidgetsDetails, COL_WIDTH, ROW_HEIGHT });
  }, []);
  const handleResizeStart = useCallback(
    (id: number, e: React.PointerEvent<HTMLElement>) => {
      pointerDown({ id, e, parentRef, draggedItemRef, COL_WIDTH, ROW_HEIGHT });
      window.addEventListener("pointermove", handleResize);
    },
    [handleResize]
  );

  const handlePointerDown = useCallback(
    (id: number, e: React.PointerEvent<HTMLElement>) => {
      if (draggedItemRef.current) return;

      pointerDown({ id, e, parentRef, draggedItemRef, COL_WIDTH, ROW_HEIGHT });

      if (handlersRefs.current) {
        window.addEventListener(
          "pointermove",
          handlersRefs.current.handlePointerMoveRef
        );
        window.addEventListener(
          "pointerup",
          handlersRefs.current.handlePointUpRef
        );
      }
    },
    []
  );

  const handlePointerMove = useCallback((e: PointerEvent) => {
    pointerMove({
      e,
      draggedItemRef,
      animationId,
      finalPosRef,
      setWidgetPlaceholder,
      setWidgetsDetails,
      COL_WIDTH,
      ROW_HEIGHT,
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    pointerUp({
      draggedItemRef,
      finalPosRef,
      animationId,
      setWidgetsDetails,
      setWidgetPlaceholder,
    });
    if (handlersRefs.current) {
      window.removeEventListener(
        "pointermove",
        handlersRefs.current.handlePointerMoveRef
      );
      window.removeEventListener(
        "pointerup",
        handlersRefs.current.handlePointUpRef
      );
    }
  }, []);

  useEffect(() => {
    handlersRefs.current = {
      handlePointerMoveRef: handlePointerMove,
      handlePointUpRef: handlePointerUp,
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <>
      <div className={`w-full relative p-2 `} ref={parentRef}>
        {widgetsDetails.map((widget) => {
          return (
            <StableDataSection
              key={widget.id}
              widget={widget}
              handlePointerDown={handlePointerDown}
              COL_WIDTH={COL_WIDTH}
              ROW_HEIGHT={ROW_HEIGHT}
              isDragged={widget.id === widgetPlaceholder?.id}
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
            className="absolute bg-blue-300 inline-block 
          cursor-grab "
          ></div>
        )}
      </div>
    </>
  );
}
