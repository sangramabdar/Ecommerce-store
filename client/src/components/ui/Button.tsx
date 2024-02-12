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
        "bg-accent text-white rounded-md self-center font-semibold px-2 py-2",
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
