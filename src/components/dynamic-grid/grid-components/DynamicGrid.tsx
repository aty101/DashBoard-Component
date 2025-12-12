"use client";
import { useEffect, useState } from "react";
import { LimitsType, WidgetDetailsType, WidgetPlaceHolderType } from "../types";
import { useGlobalRefs } from "../hooks/useGlobalRefs";
import { useDrag } from "../hooks/useDrag";
import { useResize } from "../hooks/useResize";
import Placeholder from "./Placeholder";
import DataSectionList from "./DataSectionList";
import GridContextProvider from "./GridContextProvider";
import { createGridSizeObserver } from "../utils/responsiveGridFunctions/createGridSizeObserver";

export const COL_WIDTH = 150;
export const ROW_HEIGHT = 150;
export const GAP = 10;

export default function DynamicGrid() {
  /* ...STATES DECLARATION... */

  // Widgets state
  const [widgetsDetails, setWidgetsDetails] = useState<WidgetDetailsType[]>([
    { id: 1, x: 6, y: 3, width: 1, height: 1, content: "data1" },
    { id: 2, x: 7, y: 3, width: 1, height: 1, content: "data2" },
    { id: 3, x: 6, y: 4, width: 1, height: 1, content: "data3" },
    { id: 4, x: 7, y: 4, width: 1, height: 1, content: "data4" },
  ]);

  // Current active widget placeholder and final position
  const [widgetPlaceholder, setWidgetPlaceholder] =
    useState<WidgetPlaceHolderType | null>(null);

  const [, /*limitsState*/ setLimitsState] = useState<LimitsType>({
    maxCol: 0,
    maxRow: 0,
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
  useEffect(
    () => {
      if (!parentRef.current) return;
      const resizeObserver = createGridSizeObserver(globalRefs, setLimitsState);
      return () => {
        if (resizeObserver) resizeObserver.disconnect();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Track widgets detailes state change
  useEffect(
    () => {
      widgetsDetailsRef.current = widgetsDetails;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [widgetsDetails]
  );

  return (
    <>
      <GridContextProvider
        value={{
          widgetPlaceholder,
          widgetsDetails,
          handleDraggingStart,
          handleResizeStart,
        }}
      >
        <div
          className={`max-w-full w-full relative overflow-hidden p-2 pr-0 select-none`}
          ref={parentRef}
        >
          <DataSectionList />
          <Placeholder />
        </div>
      </GridContextProvider>
    </>
  );
}
