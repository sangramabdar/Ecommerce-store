import cn from "../../utils/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-100 h-20", className)}
      {...props}
    />
  );
}

export default Skeleton;
