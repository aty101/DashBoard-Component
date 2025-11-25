import { DragEventHandler, MouseEventHandler } from "react";
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
  return (
    <>
      <div
        className={`relative bg-white text-black flex justify-center items-center w-full h-[200px] cursor-grab select-none`}
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h2 className="text-2xl">{type}</h2>
        <button
          className="absolute p-3 top-0 right-0 cursor-pointer "
          onClick={handleClosedData}
        >
          <IoMdClose className="text-3xl" />
        </button>
      </div>
    </>
  );
}
