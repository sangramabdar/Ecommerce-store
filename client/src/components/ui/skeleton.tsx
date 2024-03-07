import cn from "../../utils/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md bg-gray-200/60 animate-pulse h-10 w-full",
        className
      )}
      {...props}
    />
  );
}

export default Skeleton;
