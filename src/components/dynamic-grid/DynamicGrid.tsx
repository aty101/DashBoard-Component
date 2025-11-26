"use client";

import { Console } from "console";
import { useEffect, useState } from "react";

const Col_Width = 200;
const Row_Height = 200;

type WidgetDetail = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

type DragPos = {
  id: number;
  offsetX: number;
  offsetY: number;
};

export default function DynamicGrid() {
  const [widgetsDetails, setWidgetsDetails] = useState<WidgetDetail[]>([
    { id: 1, x: 0, y: 0, width: 200, height: 200 },
    // { id: 2, x: 1, y: 1, width: 200, height: 200 },
    // { id: 3, x: 2, y: 2, width: 200, height: 200 },
    // { id: 4, x: 3, y: 3, width: 200, height: 200 },
  ]);

  const [draggedItem, setDraggedItem] = useState<DragPos | null>(null);

  const mouseDown = (id: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    console.log(
      `CursorX : ${e.clientX}\nCursorY : ${e.clientY}\nDivX : ${rect.left}\nDivY : ${rect.top}`
    );
    setDraggedItem({
      id,
      offsetX: 0,
      offsetY: 0,
    });
  };
  const mouseMove = (e: MouseEvent) => {
    if (!draggedItem) return;

    const newX = e.clientX;
    const newY = e.clientY;
    setWidgetsDetails((prev) =>
      prev.map((widget) => {
        if (widget.id !== draggedItem.id) return widget;
        return {
          ...widget,
          x: newX,
          y: newY,
        };
      })
    );
  };
  const mouseUp = () => {
    setDraggedItem(null);
  };

  useEffect(() => {
    if (draggedItem) {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
    } else {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, [draggedItem]);

  return (
    <div
      className={`w-full relative p-2`}
      onMouseMove={(e) => {
        console.log(`CursorX : ${e.clientX}\nCursorY : ${e.clientY}`);
      }}
    >
      {widgetsDetails.map((widget) => (
        <div
          onMouseDown={(e) => mouseDown(widget.id, e)}
          key={widget.id}
          style={{
            width: widget.width,
            height: widget.height,
            transform: `translate(${widget.x}px,${widget.y}px)`,
          }}
          className="absolute bg-blue-100 inline-block m-2
          cursor-grab hover:bg-blue-700 "
        ></div>
      ))}
    </div>
  );
}
