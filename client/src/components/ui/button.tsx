import React from "react";
import cn from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-accent text-white rounded-md self-center px-6 py-2 active:bg-primary active:text-black active:ring-1 active:ring-accent hover:bg-accent/10 hover:text-gray-900 hover:ring-1 hover:ring-accent",
          disabled && "opacity-30",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
