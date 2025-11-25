import { useDataShow } from "@/utils/dataShow/useDataShow";
import Description from "./Description";

export default function SummerizedButton() {
  const { columns, handleColsNum } = useDataShow();
  const mapArray = [0, 1, 2, 3];
  return (
    <>
      <button
        className={`relative group px-1 py-1.5  ${
          columns == 2 && "border border-white"
        }`}
        onClick={() => handleColsNum(2)}
      >
        <ul className="grid grid-cols-2 justify-center items-center gap-0.5 w-6 h-5 ">
          {mapArray.map((index) => {
            return <li key={index} className="bg-white w-full h-1.5"></li>;
          })}
        </ul>
        <Description>Summerized View</Description>
      </button>
    </>
  );
}
