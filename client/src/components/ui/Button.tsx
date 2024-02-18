import React from "react";
import cn from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "bg-accent text-white rounded-md self-center px-4 py-2",
          disabled && "opacity-30",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
