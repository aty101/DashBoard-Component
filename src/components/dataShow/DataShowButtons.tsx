import { useDataShow } from "@/utils/dataShow/useDataShow";

export default function DataShowButtons() {
  const { handleColsNum } = useDataShow();
  return (
    <>
      <div className="mb-5 flex gap-3">
        <button
          className="p-3 w-32 border border-white"
          onClick={() => handleColsNum(1)}
        >
          one
        </button>
        <button
          className="p-3 w-32 border border-white"
          onClick={() => handleColsNum(2)}
        >
          gird
        </button>
      </div>
    </>
  );
}
