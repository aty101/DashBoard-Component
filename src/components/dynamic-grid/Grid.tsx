"use client";

import { useState, useEffect } from "react";

const COL_WIDTH = 100;
const ROW_HEIGHT = 30;
const GRID_COLS = 12;

// ---------------------------
// Types
// ---------------------------

type Widget = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type DragState = {
  id: string;
  offsetX: number;
  offsetY: number;
} | null;

// ---------------------------
// Component
// ---------------------------

export default function Grid() {
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: "1", x: 0, y: 0, w: 3, h: 3 },
    { id: "2", x: 3, y: 0, w: 3, h: 3 },
  ]);

  const [dragging, setDragging] = useState<DragState>(null);

  const handleMouseDown = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setDragging({
      id,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;

    setWidgets((prev) =>
      prev.map((w) => {
        if (w.id !== dragging.id) return w;

        const newX = Math.max(
          0,
          Math.round((e.clientX - dragging.offsetX) / COL_WIDTH)
        );
        const newY = Math.max(
          0,
          Math.round((e.clientY - dragging.offsetY) / ROW_HEIGHT)
        );

        return { ...w, x: newX, y: newY };
      })
    );
  };

  const handleMouseUp = () => setDragging(null);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <div className="relative w-full h-[600px] border border-gray-300">
      {widgets.map((w) => (
        <div
          key={w.id}
          onMouseDown={(e) => handleMouseDown(w.id, e)}
          className="absolute bg-blue-300 rounded cursor-move"
          style={{
            width: w.w * COL_WIDTH,
            height: w.h * ROW_HEIGHT,
            transform: `translate(${w.x * COL_WIDTH}px, ${w.y * ROW_HEIGHT}px)`,
          }}
        >
          Widget {w.id}
        </div>
      ))}
    </div>
  );
}
