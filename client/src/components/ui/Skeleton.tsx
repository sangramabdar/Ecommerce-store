import cn from "../../utils/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200/80 h-10 w-full",
        className
      )}
      {...props}
    />
  );
}

export default Skeleton;
