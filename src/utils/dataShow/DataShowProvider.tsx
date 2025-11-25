import { createContext, Dispatch, ReactNode, SetStateAction } from "react";

export type DataShowContextType = {
  dataOrder: number[];
  setDataOrder: Dispatch<SetStateAction<number[]>>;
  columns: number;
  handleColsNum: (input: number) => void;
  closedData: number[];
  handleClosedData: (index: number) => void;
} | null;

export const DataShowContext = createContext<DataShowContextType>(null);

export function DataShowProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: DataShowContextType;
}) {
  return (
    <DataShowContext.Provider value={value}>
      {children}
    </DataShowContext.Provider>
  );
}
