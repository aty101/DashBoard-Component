import { DragEventHandler, MouseEventHandler, useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function DataCard({
  type,
  handleDragStart,
  handleDrop,
  handleClosedData,
  handleDragOver,
}: {
  type: string;

  handleDragStart: DragEventHandler;
  handleDrop: DragEventHandler;
  handleClosedData: MouseEventHandler;
  handleDragOver: DragEventHandler;
}) {
  const [active, setActive] = useState<boolean>(false);
  const handleActive = () => {
    setActive((prev) => !prev);
  };
  return (
    <>
      <div
        className={`relative bg-white text-black p-3
          flex justify-center items-center w-full 
           cursor-grab select-none ${active && "col-span-full"}  hover:bg-gray-400`}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => handleActive()}
      >
        <h2 className="text-2xl">{type}</h2>
        <button
          className="absolute  top-0 right-0 cursor-pointer "
          onClick={handleClosedData}
        >
          <IoMdClose className="text-3xl" />
        </button>
      </div>
    </>
  );
}
