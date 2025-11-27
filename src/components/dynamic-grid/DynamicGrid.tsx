"use client";
import { useEffect, useRef, useState } from "react";
import { mouseDown } from "./mouseDown";
import { DragPos, FinalPos, WidgetDetail } from "./types";
import { mouseMove } from "./mouseMove";
import { mouseUp } from "./mouseUp";

const COL_NUM = 12;
const COL_WIDTH = 100;
const ROW_HEIGHT = 100;

export default function DynamicGrid() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [widgetsDetails, setWidgetsDetails] = useState<WidgetDetail[]>([
    { id: 1, x: 0, y: 0, width: 2, height: 2 },
    { id: 2, x: 1, y: 1, width: 2, height: 2 },
    { id: 3, x: 2, y: 2, width: 2, height: 2 },
    // { id: 4, x: 3, y: 3, width: 200, height: 200 },
  ]);

  const [draggedItem, setDraggedItem] = useState<DragPos | null>(null);
  const [finalPos, setFinalPos] = useState<FinalPos | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    mouseDown(
      id,
      e,
      parentRef,
      setDraggedItem,
      setFinalPos,
      COL_WIDTH,
      ROW_HEIGHT
    );
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!draggedItem) return;
    mouseMove(
      e,
      draggedItem,
      setWidgetsDetails,
      setFinalPos,
      COL_WIDTH,
      ROW_HEIGHT
    );
  };
  const handleMouseUp = () => {
    mouseUp(finalPos!, setDraggedItem, setFinalPos, setWidgetsDetails);
  };

  useEffect(() => {
    if (draggedItem) {
      window.addEventListener("mousemove", handleMouseMove);
    }else {
      window.removeEventListener("mousemove", handleMouseMove);
    }

    if (draggedItem && finalPos) {
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggedItem, finalPos]);

  return (
    <div className={`w-full relative p-2 overflow-hidden`} ref={parentRef}>
      {widgetsDetails.map((widget) => (
        <div
          key={widget.id}
          onMouseDown={(e) => handleMouseDown(e, widget.id)}
          style={{
            width: widget.width * COL_WIDTH,
            height: widget.height * ROW_HEIGHT,
            transform: `translate(${widget.x * COL_WIDTH}px,${
              widget.y * ROW_HEIGHT
            }px)`,
            zIndex: `${draggedItem ? "1" : "0"}`,
          }}
          className="absolute bg-blue-100 inline-block 
          cursor-grab "
        ></div>
      ))}
      {finalPos && (
        <div
          style={{
            width: finalPos.width,
            height: finalPos.height,
            transform: `translate(${finalPos.calculatedX * COL_WIDTH}px,${
              finalPos.calculatedY * ROW_HEIGHT
            }px)`,
          }}
          className="absolute bg-blue-400 inline-block 
        cursor-grab z-[-1] opacity-50 "
        ></div>
      )}
    </div>
  );
}
