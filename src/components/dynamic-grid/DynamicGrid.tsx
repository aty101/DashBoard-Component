"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { DraggedItemType, WidgetDetailsType } from "./types";

const COL_NUM = 12;
const COL_WIDTH = 100;
const ROW_HEIGHT = 100;

export default function DynamicGrid() {
  const parentRef = useRef<HTMLDivElement>(null);
  const draggedItemRef = useRef<DraggedItemType>(null);
  const finalPosRef = useRef<WidgetDetailsType>(null);
  const animationId = useRef<number>(null);

  const [widgetsDetails, setWidgetsDetails] = useState<WidgetDetailsType[]>([
    { id: 1, x: 0, y: 0, width: 2, height: 2 },
    { id: 2, x: 1, y: 0, width: 2, height: 2 },
    { id: 3, x: 2, y: 2, width: 2, height: 2 },
    // { id: 4, x: 3, y: 3, width: 200, height: 200 },
  ]);
  const [widgetPlaceholder, setWidgetPlaceholder] =
    useState<WidgetDetailsType | null>(null);

  const handlePointerDown = (
    id: number,
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const widgetRect = e.currentTarget.getBoundingClientRect();
    const parentRect = parentRef.current?.getBoundingClientRect();
    const offsetX = e.clientX - widgetRect.left + (parentRect?.left ?? 0);
    const offsetY = e.clientY - widgetRect.top + (parentRect?.top ?? 0);
    draggedItemRef.current = { id, offsetX, offsetY };

    setWidgetPlaceholder({
      id,
      x: (widgetRect.left - (parentRect?.left ?? 0)) / COL_WIDTH,
      y: (widgetRect.top - (parentRect?.top ?? 0)) / ROW_HEIGHT,
      width: widgetRect.width / COL_WIDTH,
      height: widgetRect.height / ROW_HEIGHT,
    });

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!draggedItemRef.current) return;
    const current = draggedItemRef.current;

    const newX = (e.clientX - current.offsetX) / COL_WIDTH;
    const newY = (e.clientY - current.offsetY) / ROW_HEIGHT;

    const finalPosX = Math.round(newX);
    const finalPosY = Math.round(newY);

    setWidgetPlaceholder((prev) => {
      if (!prev) return null;
      const newVal = { ...prev, x: finalPosX, y: finalPosY };
      finalPosRef.current = newVal;
      return newVal;
    });
    if (!animationId.current) {
      animationId.current = requestAnimationFrame(() => {
        setWidgetsDetails((prev) => {
          return prev.map((widget) => {
            if (widget.id != draggedItemRef.current?.id) return widget;

            return {
              ...widget,
              x: newX,
              y: newY,
            };
          });
        });
        animationId.current = null;
      });
    }
  };
  const handlePointerUp = () => {
    if (finalPosRef.current) {
      console.log(widgetPlaceholder);
      setWidgetsDetails((prev) =>
        prev.map((widget) =>
          widget.id === finalPosRef.current!.id
            ? {
                ...widget,
                x: finalPosRef.current!.x,
                y: finalPosRef.current!.y,
              }
            : widget
        )
      );
    }
    setWidgetPlaceholder(null);
    draggedItemRef.current = null;
    if (animationId.current) {
      cancelAnimationFrame(animationId.current);
      animationId.current = null;
    }
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  return (
    <div className={`w-full relative p-2 `} ref={parentRef}>
      {widgetsDetails.map((widget) => (
        <div
          key={widget.id}
          onPointerDown={(e) => handlePointerDown(widget.id, e)}
          style={{
            width: widget.width * COL_WIDTH,
            height: widget.height * ROW_HEIGHT,
            transform: `translate(${widget.x * COL_WIDTH}px,${
              widget.y * ROW_HEIGHT
            }px)`,
            zIndex: `${widget.id == widgetPlaceholder?.id ? "1" : "0"}`,
          }}
          className="absolute bg-blue-100 inline-block 
          cursor-grab "
        ></div>
      ))}
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
  );
}
