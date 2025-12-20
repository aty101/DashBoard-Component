"use client";
import { useEffect, useEffectEvent, useState } from "react";
import {
  GridSizeType,
  WidgetDetailsType,
  WidgetPlaceHolderType,
} from "../types";
import { useGlobalRefs } from "../hooks/useGlobalRefs";
import { useDrag } from "../hooks/useDrag";
import { useResize } from "../hooks/useResize";
import Placeholder from "./Placeholder";
import DataSectionList from "./DataSectionList";
import GridContextProvider from "./GridContextProvider";
import { createGridSizeObserver } from "../utils/responsiveGridFunctions/createGridSizeObserver";
import { widgetsCompaction } from "../utils/collisionFunctions/widgetsCompaction";

export function handleColsLimitInPlace(
  widgets: WidgetDetailsType[],
  cols: number
) {
  // 1️⃣ Clamp widgets inside column limit
  for (const w of widgets) {
    const maxX = cols - w.width;
    if (w.x > maxX) {
      w.x = Math.max(0, maxX);
    }
  }

  // 2️⃣ Resolve collisions AFTER clamping
  widgetsCompaction(widgets);
}

export default function DynamicGrid() {
  /* ...STATES DECLARATION... */

  // Widgets state
  const [widgetsDetails, setWidgetsDetails] = useState<WidgetDetailsType[]>([
    { id: 1, x: 0, y: 0, width: 2, height: 1, content: "data1" },
    { id: 2, x: 0, y: 1, width: 2, height: 1, content: "data2" },

    { id: 3, x: 2, y: 0, width: 1, height: 2, content: "data3" },
    { id: 4, x: 3, y: 0, width: 3, height: 2, content: "data4" },

    // new widgets (stacked safely below)
    { id: 5, x: 0, y: 2, width: 2, height: 1, content: "data5" },
    { id: 6, x: 2, y: 2, width: 2, height: 1, content: "data6" },

    { id: 7, x: 0, y: 3, width: 3, height: 1, content: "data7" },
    { id: 8, x: 4, y: 2, width: 3, height: 2, content: "data8" },
  ]);

  // Current active widget placeholder and final position
  const [widgetPlaceholder, setWidgetPlaceholder] =
    useState<WidgetPlaceHolderType | null>(null);

  const [maxColState, setMaxColState] = useState<number>(0);

  const [gridSize, setGridSize] = useState<GridSizeType>({
    COL_WIDTH: 0,
    ROW_HEIGHT: 0,
    GAP: 8,
  });

  // Fetch all global refs to be passed to handlers
  const globalRefs = useGlobalRefs(widgetsDetails);

  // Fetch current used refs
  const { parentRef, widgetsDetailsRef } = globalRefs;

  /* ...DRAGGING HANDLERS... */
  const handleDraggingStart = useDrag(
    globalRefs,
    setWidgetPlaceholder,
    setWidgetsDetails
  );

  /* ...Resizing HANDLERS... */
  const handleResizeStart = useResize(
    globalRefs,
    setWidgetPlaceholder,
    setWidgetsDetails
  );
  /* ...EFFECT TO CAPTURE  MEMORY LOCATIONS AND STATES CHANGES... */

  // Attach size observer to the grid div
  const attachSizeObserver = useEffectEvent(() => {
    const resizeObserver = createGridSizeObserver(
      globalRefs,
      setMaxColState,
      setGridSize
    );
    return resizeObserver;
  });
  useEffect(() => {
    const resizeObserver = attachSizeObserver();
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    console.log(maxColState);
  }, [maxColState, widgetsDetailsRef]);

  // Track widgets detailes state change
  const changeWidgetDetailsRef = useEffectEvent(
    (widgets: WidgetDetailsType[]) => {
      widgetsDetailsRef.current = widgets;
    }
  );
  useEffect(() => {
    changeWidgetDetailsRef(widgetsDetails);
  }, [widgetsDetails]);

  return (
    <>
      <GridContextProvider
        value={{
          widgetPlaceholder,
          widgetsDetails,
          gridSize,
          handleDraggingStart,
          handleResizeStart,
        }}
      >
        <div
          className={`max-w-full w-[75%] mx-auto border-x border-gray-500 relative overflow-x-hidden overflow-y-auto p-2  select-none`}
          ref={parentRef}
        >
          <DataSectionList />
          <Placeholder />
        </div>
      </GridContextProvider>
    </>
  );
}
