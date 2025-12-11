import { useContext } from "react";
import { StableDataSection } from "./StableDataSection";
import { GridContext } from "./GridContextProvider";

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
            isDragged={widget.id === widgetPlaceholder?.id}
          />
        );
      })}
    </>
  );
}
