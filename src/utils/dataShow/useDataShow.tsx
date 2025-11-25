import { useContext } from "react";
import { DataShowContext } from "./DataShowProvider";

export function useDataShow() {
  const ctx = useContext(DataShowContext);
  if (!ctx) {
    throw new Error(
      "useDataShow must be used inside <DataShowContext.Provider>"
    );
  }
  return ctx;
}
