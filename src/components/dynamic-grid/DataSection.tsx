import React from "react";
import { WidgetDetailsType } from "./types";

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
      onPointerDown={(e) => handlePointerDown(widget.id, e)}
      style={{
        width: widget.width * COL_WIDTH,
        height: widget.height * ROW_HEIGHT,
        transform: `translate(${widget.x * COL_WIDTH}px, ${
          widget.y * ROW_HEIGHT
        }px)`,
        zIndex: `${isDragged ? "1" : "0"}`,
      }}
      className="absolute bg-blue-100  cursor-grab flex justify-end items-end p-1"
    >
      <div className="w-full h-full relative z-2">
        <span
          className="absolute border-t-2 border-l-2 top-0 left-0 border-black w-[17px] h-[17px]  cursor-nesw-resize"
          onPointerDown={(e) => {
            e.stopPropagation();
            handleResizeStart(widget.id, e);
          }}
        ></span>
        <span
          className=" absolute border-t-2 border-r-2 top-0 right-0 border-black w-[17px] h-[17px]  cursor-nesw-resize"
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
        ></span>
        <span
          className="absolute border-b-2 border-l-2 bottom-0 left-0 border-black w-[17px] h-[17px] cursor-nesw-resize"
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
        ></span>
        <span
          className=" absolute border-b-2 border-r-2 bottom-0 right-0 border-black w-[17px] h-[17px] cursor-nesw-resize"
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
        ></span>
      </div>
    </section>
  );
}

export const StableDataSection = React.memo(DataSection);
