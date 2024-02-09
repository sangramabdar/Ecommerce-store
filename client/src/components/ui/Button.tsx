import React from "react";
import cn from "../../utils/cn";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

function Button({
  children,
  className,
  disabled,
  ...props
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={cn(
        "bg-accent text-white rounded-md self-center px-4 py-2 font-bold",
        disabled && "opacity-30",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
