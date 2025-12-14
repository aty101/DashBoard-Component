import { useContext } from "react";
import { StableDataSection } from "./StableDataSection";
import { GridContext } from "./GridContextProvider";
import { WidgetDetailsType } from "../types";

export default function DataSectionList() {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGridContext must be used within GridContextProvider");
  }
  const { widgetsDetails, widgetPlaceholder } = context;
  const isDragged = (widget: WidgetDetailsType) => {
    if (widgetPlaceholder) {
      return (
        widget.id === widgetPlaceholder.id 
        // (widget.x !== widgetPlaceholder.x || widget.y !== widgetPlaceholder.y)
      );
    } else {
      return false;
    }
  };

  return (
    <>
      {widgetsDetails.map((widget) => {
        return (
          <StableDataSection
            key={widget.id}
            widget={widget}
            isDragged={isDragged(widget)}
          />
        );
      })}
    </>
  );
}
