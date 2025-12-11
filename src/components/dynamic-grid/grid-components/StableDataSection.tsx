import React, { useCallback, useContext } from "react";
import { WidgetDetailsType } from "../types";
import { COL_WIDTH, GAP, ROW_HEIGHT } from "./DynamicGrid";
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
  const { handleDraggingStart, handleResizeStart } = context;

  /* ...WIDGET STYLES... */

  // Calc current size in grid units
  const width = widget.width * COL_WIDTH + GAP * (widget.width - 1);
  const height = widget.height * ROW_HEIGHT + GAP * (widget.height - 1);

  // Calc current pos in grid units
  const x = widget.x * (COL_WIDTH + GAP);
  const y = widget.y * (ROW_HEIGHT + GAP);

  // The translate value
  const transform = `translate(${x}px, ${y}px)`;

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
      }}
      className="absolute bg-blue-100  flex justify-end items-end p-1"
    >
      <div className="w-full h-full relative  flex justify-center items-center">
        <h2 className="text-3xl capitalize text-black select-none">
          {widget.content}
        </h2>
        <span
          className=" absolute border-b-2 border-r-2 bottom-0 right-0 border-black w-[17px] h-[17px] cursor-se-resize"
          onPointerDown={resizePointerDown}
        ></span>
      </div>
    </section>
  );
}

export const StableDataSection = React.memo(DataSection);
