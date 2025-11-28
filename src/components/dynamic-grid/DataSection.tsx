import React from "react";
import { WidgetDetailsType } from "./types";

function DataSection({
  widget,
  handlePointerDown,
  COL_WIDTH,
  ROW_HEIGHT,
  isDragged = false,
}: {
  widget: WidgetDetailsType;
  handlePointerDown: (id: number, e: React.PointerEvent<HTMLElement>) => void;
  COL_WIDTH: number;
  ROW_HEIGHT: number;
  isDragged?: boolean;
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
      className="absolute bg-blue-100 inline-block cursor-grab"
    ></section>
  );
}

export const StableDataSection = React.memo(DataSection);
