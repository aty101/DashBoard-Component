import React from "react";
import { WidgetDetailsType } from "./types";
import { GAP } from "./DynamicGrid";

function DataSection({
  widget,
  handlePointerDown,
  COL_WIDTH,
  ROW_HEIGHT,
  isDragged = false,
  handleResizeStart,
}: {
  widget: WidgetDetailsType;
  handlePointerDown: (id: number, e: React.PointerEvent<HTMLElement>) => void;
  COL_WIDTH: number;
  ROW_HEIGHT: number;
  isDragged?: boolean;
  handleResizeStart: (id: number, e: React.PointerEvent<HTMLElement>) => void;
}) {
  return (
    <section
      onPointerDown={(e) => {
        handlePointerDown(widget.id, e);
      }}
      style={{
        width: widget.width * COL_WIDTH + GAP * (widget.width - 1),
        height: widget.height * ROW_HEIGHT + GAP * (widget.height - 1),
        transform: `translate(${widget.x * (COL_WIDTH + GAP)}px, ${
          widget.y * (ROW_HEIGHT + GAP)
        }px)`,
        zIndex: `${isDragged ? "2" : "0"}`,
        cursor: `${isDragged ? "grabbing" : "grab"}`,
      }}
      className="absolute bg-blue-100  flex justify-end items-end p-1"
    >
      <div className="w-full h-full relative  ">
        <span
          className=" absolute border-b-2 border-r-2 bottom-0 right-0 border-black w-[17px] h-[17px] cursor-se-resize"
          onPointerDown={(e) => {
            e.stopPropagation();
            handleResizeStart(widget.id, e);
          }}
        ></span>
      </div>
    </section>
  );
}

export const StableDataSection = DataSection;
