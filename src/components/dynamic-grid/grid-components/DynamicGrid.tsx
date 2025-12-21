"use client";
import React, {
  PropsWithChildren,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
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

export function handleColsChange(
  widgets: WidgetDetailsType[],
  cols: number,
  currentWidget: WidgetDetailsType | null
) {
  let hasOverflow = false;

  // 1️⃣ Clamp widgets that exceed new cols
  for (const w of widgets) {
    const maxX = cols - w.width;

    if (w.x > maxX) {
      w.x = Math.max(w.x, maxX);
      hasOverflow = true;
    }
  }

  // 2️⃣ Run compaction ONCE if needed
  if (hasOverflow) {
    widgetsCompaction(currentWidget, widgets);
  }
}

export default function DynamicGrid({ children }: PropsWithChildren) {
  /* ...STATES DECLARATION... */
  let state: WidgetDetailsType[] = [];
  if (children) {
    let id = 1;
    let initX = 0;
    let initY = 0;
    const width = 2;
    const height = 2;
    const childrenArray = React.Children.toArray(children);
    console.log(childrenArray);
    state = childrenArray.map((child) => {
      const widget: WidgetDetailsType = {
        id,
        x: initX,
        y: initY,
        width,
        height,
        content: child,
      };
      id++;
      initX += 2;

      return widget;
    });
  }
  // Widgets state
  const [widgetsDetails, setWidgetsDetails] =
    useState<WidgetDetailsType[]>(state);

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

  // Track widgets detailes state change
  const changeWidgetDetailsRef = useEffectEvent(
    (widgets: WidgetDetailsType[]) => {
      widgetsDetailsRef.current = widgets;
    }
  );
  useEffect(() => {
    changeWidgetDetailsRef(widgetsDetails);
  }, [widgetsDetails]);

  // useEffect(() => {
  //   handleColsChange(widgetsDetailsRef.current, maxColState, null);
  //   console.log(maxColState)
  // }, [maxColState, widgetsDetailsRef]);

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
          className={`max-w-full w-full mx-auto border-x border-gray-500 relative overflow-x-hidden overflow-y-auto p-2  select-none`}
          ref={parentRef}
        >
          <DataSectionList />
          <Placeholder />
        </div>
      </GridContextProvider>
    </>
  );
}
