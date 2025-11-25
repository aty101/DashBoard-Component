"use client";
import dummy from "@/dummy.json";
import { useState } from "react";
import DataCardsList from "./DataCardslist";
import { DataShowProvider } from "@/utils/dataShow/DataShowProvider";
import DataShowButtons from "./DataShowButtons";

export default function DataShow() {
  /* ...STATES INETIALIZATION */

  // Inetializing order array state
  const seed: number[] = Array.from({ length: dummy.length }, (_, i) => i);
  const [dataOrder, setDataOrder] = useState(seed);

  // Tracking items that will not be rendered
  const [closedData, setClosedData] = useState<number[]>([]);

  // Tracking which layout is used (grid with 1 or 2 columns)
  const [columns, setColumns] = useState<number>(1);

  /* ...STATES HANDELERS... */

  // Setting the current layout
  const handleColsNum = (input: number) => setColumns(input);

  // Setting the unrendered data
  const handleClosedData = (index: number) => {
    if (!(index in closedData)) setClosedData([...closedData, index]);
  };

  return (
    <>
      <DataShowProvider
        value={{
          dataOrder,
          setDataOrder,
          columns,
          handleColsNum,
          closedData,
          handleClosedData,
        }}
      >
        <main className="w-full p-5">
          <DataShowButtons />
          <DataCardsList />
        </main>
      </DataShowProvider>
    </>
  );
}
