"use client";
import React, { PropsWithChildren, useState } from "react";
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
import { useCreateObserver } from "../hooks/useCreateObserver";
import { useWidgetDetails } from "../hooks/useWidgetDetails";
import { createInitState } from "../utils/createInitState";

export default function DynamicGrid({ children }: PropsWithChildren) {
  const [, setMaxColState] = useState<number>(0);
  /* ...STATES DECLARATION... */
  const initState = createInitState(children);

  // Widgets state
  const [widgetsDetails, setWidgetsDetails] =
    useState<WidgetDetailsType[]>(initState);

  // Current active widget placeholder and final position
  const [widgetPlaceholder, setWidgetPlaceholder] =
    useState<WidgetPlaceHolderType | null>(null);

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
  useCreateObserver(globalRefs, setMaxColState, setGridSize);

  // Track widgets detailes state change
  useWidgetDetails(widgetsDetailsRef, widgetsDetails);

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
          className={`bg-transparent max-w-full w-full mx-auto border-x border-gray-500 relative overflow-x-hidden overflow-y-auto p-2  select-none`}
          ref={parentRef}
        >
          <DataSectionList />
          <Placeholder />
        </div>
      </GridContextProvider>
    </>
  );
}
