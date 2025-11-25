import { useDataShow } from "@/utils/dataShow/useDataShow";
import Description from "./Description";

export default function DetailedButton() {
  const { columns, handleColsNum } = useDataShow();
  const mapArray = [0, 1, 2];
  return (
    <>
      <button
        className={`relative group p-1  ${columns == 1 && "border border-white"}`}
        onClick={() => handleColsNum(1)}
      >
        <ul className="flex flex-col gap-1 w-6 h-6 justify-center items-center">
          {mapArray.map((index) => {
            return <li key={index} className="bg-white w-full h-0.5"></li>;
          })}
        </ul>
        <Description>Detailed View</Description>
      </button>
    </>
  );
}
