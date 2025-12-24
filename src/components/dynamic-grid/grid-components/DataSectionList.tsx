import { useContext } from "react";
import { StableDataSection } from "./StableDataSection";
import { GridContext } from "./GridContextProvider";
import { WidgetDetailsType, WidgetPlaceHolderType } from "../types";

const isDragged = (
  widget: WidgetDetailsType,
  widgetPlaceholder: WidgetPlaceHolderType | null
) => {
  if (widgetPlaceholder) {
    return (
      widget.id === widgetPlaceholder.id
      // (widget.x !== widgetPlaceholder.x || widget.y !== widgetPlaceholder.y)
    );
  } else {
    return false;
  }
};

export default function DataSectionList() {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGridContext must be used within GridContextProvider");
  }
  const { widgetsDetails, widgetPlaceholder } = context;

  return (
    <>
      {widgetsDetails.map((widget) => {
        return (
          <StableDataSection
            key={widget.id}
            widget={widget}
            isDragged={isDragged(widget, widgetPlaceholder)}
          />
        );
      })}
    </>
  );
}
