import React from "react";
import cn from "../../utils/cn";

interface InputProps {
  error?: string;
  label: string;
  type: string;
  className?: string;
}

function _Input({ label, className, error, ...props }: InputProps, ref: any) {
  return (
    <div className="flex flex-col mb-2">
      <label className="block text-sm font-medium text-primary">{label}</label>
      <input
        ref={ref}
        className={cn(
          "py-3 px-4 block w-full border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none focus:ring-1 focus:ring-accent focus:outline-none text-grey-600 mt-2",
          className
        )}
        {...props}
      />
      {error ? <span className="text-red-600/80 mt-2">{error}</span> : null}
    </div>
  );
}

const Input = React.forwardRef(_Input);

export default Input;
