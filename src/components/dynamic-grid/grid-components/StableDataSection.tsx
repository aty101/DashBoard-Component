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

  const { COL_WIDTH, ROW_HEIGHT, GAP } = gridSize;
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
    [handleDraggingStart, widget]
  );
  const resizePointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      e.stopPropagation();
      handleResizeStart(widget.id, e);
    },
    [handleResizeStart, widget]
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
      className=" absolute bg-transparent   p-1 select-none  text-3xl overflow-hidden"
    >
      <div className="w-full h-full relative  ">
        {widget.content}
        <span
          onPointerDown={resizePointerDown}
          className="absolute  bottom-0 right-0  w-5 h-5 cursor-nwse-resize"
        >
          <span className="absolute bottom-2 right-2 border-black border-b-2 border-r-2  w-2.5 h-2.5 "></span>
        </span>
      </div>
    </section>
  );
}

export const StableDataSection = DataSection;
