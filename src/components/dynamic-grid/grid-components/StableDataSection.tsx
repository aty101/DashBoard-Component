import React, { useCallback, useContext } from "react";
import { WidgetDetailsType } from "../types";

import { GridContext } from "./GridContextProvider";

type DataSectionProps = {
  widget: WidgetDetailsType;
  isDragged?: boolean;
};

function DataSection({ widget, isDragged = false }: DataSectionProps) {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGridContext must be used within GridContextProvider");
  }
  const { gridSize, handleDraggingStart, handleResizeStart } = context;

  const { COL_WIDTH, ROW_HEIGHT, GAP } = gridSize ?? {
    COL_WIDTH: 0,
    ROW_HEIGHT: 0,
    GAP: 0,
  };
  /* ...WIDGET STYLES... */

  // Calc current size in grid units
  const width = widget.width * COL_WIDTH + GAP * (widget.width - 1);
  const height = widget.height * ROW_HEIGHT + GAP * (widget.height - 1);

  // Calc current pos in grid units
  const x = widget.x * (COL_WIDTH + GAP);
  const y = widget.y * (ROW_HEIGHT + GAP);

  // The translate value
  const transform = `translateX(${x}px) translateY(${y}px)`;

  // Show the dragged element in a heigher level
  const zIndex = `${isDragged ? "2" : "0"}`;

  // Show cursor change while drag
  const cursor = `${isDragged ? "grabbing" : "grab"}`;

  const dragPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      handleDraggingStart(widget.id, e);
    },
    [handleDraggingStart, widget.id]
  );
  const resizePointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      e.stopPropagation();
      handleResizeStart(widget.id, e);
    },
    [handleResizeStart, widget.id]
  );

  return (
    <section
      onPointerDown={dragPointerDown}
      style={{
        width,
        height,
        transform,
        zIndex,
        cursor,
        transitionDuration: isDragged ? "0s" : "0.2s",
      }}
      className="absolute bg-blue-100  flex justify-end items-end p-1 select-none border border-black text-3xl"
    >
      <div className="w-full h-full relative  flex justify-center items-center">
        <h2 className=" capitalize text-black ">{widget.content}</h2>
        <span
          onPointerDown={resizePointerDown}
          className="absolute  bottom-0 right-0  w-5 h-5 cursor-se-resize"
        >
          <span className="absolute bottom-0 right-0 border-black border-b-2 border-r-2  w-2.5 h-2.5"></span>
        </span>
      </div>
    </section>
  );
}

export const StableDataSection = DataSection;
