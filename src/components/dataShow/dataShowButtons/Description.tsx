export default function Description({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="absolute px-2 -right-25 -bottom-5 
         opacity-0 group-hover:opacity-100 w-fit h-5 
         bg-gray-200 text-black rounded-md text-center text-sm"
      >
        {children}
      </div>
    </>
  );
}
