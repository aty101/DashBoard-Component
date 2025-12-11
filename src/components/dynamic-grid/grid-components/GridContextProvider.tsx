import { createContext } from "react";
import { WidgetDetailsType, WidgetPlaceHolderType } from "../types";

export type GridContextProps = {
  widgetPlaceholder: WidgetPlaceHolderType | null;
  widgetsDetails: WidgetDetailsType[];
  handleDraggingStart: (id: number, e: React.PointerEvent<HTMLElement>) => void;
  handleResizeStart: (id: number, e: React.PointerEvent<HTMLElement>) => void;
};

type ProviderProps = {
  value: GridContextProps;
};
export const GridContext = createContext<GridContextProps | null>(null);
export default function GridContextProvider({
  value,
  children,
}: React.PropsWithChildren<ProviderProps>) {
  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
}
