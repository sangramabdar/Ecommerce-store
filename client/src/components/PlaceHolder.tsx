import cn from "../utils/cn";

function PlaceHolder({
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        " animate-pulse relative shimmer rounded-md h-screen w-screen p-8 bg-slate-200",
        className
      )}
    ></div>
  );
}

export default PlaceHolder;
