"use client";

import { useEffect, useRef, useState } from "react";

type WidgetDetail = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

type DragData = {
  id: number;
  offsetX: number;
  offsetY: number;
};

const GRID_SIZE = 50;

export default function Grid() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [widgetsDetails, setWidgetsDetails] = useState<WidgetDetail[]>([
    { id: 1, x: 0, y: 0, width: 200, height: 200 },
    { id: 2, x: 250, y: 0, width: 200, height: 200 },
    { id: 3, x: 0, y: 250, width: 200, height: 200 },
    { id: 4, x: 250, y: 250, width: 200, height: 200 },
  ]);

  const [dragData, setDragData] = useState<DragData | null>(null);

  const isColliding = (a: WidgetDetail, b: WidgetDetail) => {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  };

  const mouseDown = (id: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const elementRect = e.currentTarget.getBoundingClientRect();

    const mouseXInContainer = e.clientX - containerRect.left;
    const mouseYInContainer = e.clientY - containerRect.top;

    const elementXInContainer = elementRect.left - containerRect.left;
    const elementYInContainer = elementRect.top - containerRect.top;

    setDragData({
      id,
      offsetX: mouseXInContainer - elementXInContainer,
      offsetY: mouseYInContainer - elementYInContainer,
    });
  };

  const mouseMove = (e: MouseEvent) => {
    if (!dragData || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    const mouseXInContainer = e.clientX - containerRect.left;
    const mouseYInContainer = e.clientY - containerRect.top;

    setWidgetsDetails((prev) => {
      const draggedWidget = prev.find((w) => w.id === dragData.id);
      if (!draggedWidget) return prev;

      const maxX = containerRect.width - draggedWidget.width;
      const maxY = containerRect.height - draggedWidget.height;

      const rawX = mouseXInContainer - dragData.offsetX;
      const rawY = mouseYInContainer - dragData.offsetY;

      let snappedX = Math.round(rawX / GRID_SIZE) * GRID_SIZE;
      let snappedY = Math.round(rawY / GRID_SIZE) * GRID_SIZE;

      snappedX = Math.min(Math.max(snappedX, 0), maxX);
      snappedY = Math.min(Math.max(snappedY, 0), maxY);

      const candidateRect = {
        ...draggedWidget,
        x: snappedX,
        y: snappedY,
      };

      const collides = prev.some(
        (w) => w.id !== dragData.id && isColliding(candidateRect, w)
      );

      return prev.map((widget) =>
        widget.id === dragData.id
          ? collides
            ? widget
            : { ...widget, x: snappedX, y: snappedY }
          : widget
      );
    });
  };

  const mouseUp = () => {
    setDragData(null);
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, [dragData]);

  return (
    <div
      ref={containerRef}
      className="w-full relative p-0"
      style={{ height: 600, border: "1px solid #ccc" }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          backgroundImage:
            "linear-gradient(to right, #ddd 1px, transparent 1px), linear-gradient(to bottom, #ddd 1px, transparent 1px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {widgetsDetails.map((widget) => (
        <div
          key={widget.id}
          onMouseDown={(e) => mouseDown(widget.id, e)}
          style={{
            width: widget.width,
            height: widget.height,
            position: "absolute",
            left: widget.x,
            top: widget.y,
            userSelect: "none",
            cursor: dragData?.id === widget.id ? "grabbing" : "grab",
            backgroundColor: "#bfdbfe",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            transition: dragData ? "none" : "left 0.2s, top 0.2s",
            zIndex: dragData?.id === widget.id ? 10 : 1,
          }}
          className="hover:bg-blue-500"
        />
      ))}
    </div>
  );
}
