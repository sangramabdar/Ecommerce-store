import cn from "../utils/cn";

function PlaceHolder({
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        " bg-slate-200 animate-pulse  relative shimmer rounded-md h-screen w-screen m-4",
        className
      )}
    ></div>
  );
}

export default PlaceHolder;
