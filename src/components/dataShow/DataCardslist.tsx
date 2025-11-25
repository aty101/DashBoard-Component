import { useState } from "react";

import dummy from "@/dummy.json";
import { useDataShow } from "@/utils/dataShow/useDataShow";
import DataCard from "./DataCard";
export default function DataCardsList() {
  // Context
  const { dataOrder, setDataOrder, columns, closedData, handleClosedData } =
    useDataShow();

  /* ...STATES INETIALIZATION... */

  // State to track current dragged element
  const [currentItem, setCurrentItem] = useState<number | null>(null);

  /* ...DRAG HANDLING FUNCTIONS...  */

  // Handling the start of the dragging (set the current item state with the dragged item index)
  const handleDragStart = (index: number) => {
    setCurrentItem(index);
  };

  // Adds logic when hovering with a dragged item on an item
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handling the leaving of a dragged item
  const handleDrop = (index: number) => {
    if (currentItem === null || currentItem === index) return;

    const newData = [...dataOrder];
    const temp = newData[currentItem];
    newData[currentItem] = newData[index];
    newData[index] = temp;

    setDataOrder(newData);
    setCurrentItem(null);
  };

  return (
    <>
      <div
        className={` grid gap-4 auto-rows-[200px] ${
          columns == 1 ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        {dataOrder.map((order, index) => {
          const item = dummy[order];
          if (!closedData.includes(index))
            return (
              <DataCard
                key={item.id}
                type={item.type}
                handleClosedData={() => handleClosedData(index)}
                handleDragStart={() => handleDragStart(index)}
                handleDrop={() => handleDrop(index)}
                handleDragOver={handleDragOver}
              />
            );
        })}
      </div>
    </>
  );
}
