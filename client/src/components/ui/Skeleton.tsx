import cn from "../../utils/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-gray-100 h-10 w-full",
        className
      )}
      {...props}
    />
  );
}

export default Skeleton;
