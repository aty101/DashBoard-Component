import DetailedButton from "./DetailedButton";
import SummerizedButton from "./SummerizedButton";

export default function LayoutButtons({ className }: { className?: string }) {
  return (
    <>
      <fieldset
        className={`px-3 pb-3 pt-1 flex justify-center items-center gap-3 border border-white ${className}`}
      >
        <legend className="p-0.5 text-sm">Layout</legend>
        <div className="flex gap-2 justify-center items-center">
          <DetailedButton />
          <SummerizedButton />
        </div>
      </fieldset>
    </>
  );
}
