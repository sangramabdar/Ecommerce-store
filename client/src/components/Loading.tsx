import ReactLoading from "react-loading";
import cn from "../utils/cn";
import React from "react";

function Loading({
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("flex justify-center items-center flex-col", className)}>
      <ReactLoading type="bubbles" color="black" />
      <h1 className="font-bold">Loading...</h1>
    </div>
  );
}

export default Loading;
