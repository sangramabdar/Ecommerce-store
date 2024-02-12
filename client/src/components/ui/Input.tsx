import cn from "../../utils/cn";

interface InputProps {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  error: string;
  touched: boolean;
  label: string;
  type: string;
  className?: string;
}

function Input({
  error,
  touched,
  label,
  className,
  ...props
}: Partial<InputProps>) {
  const isInvalid = error && touched;

  return (
    <div className="flex flex-col mb-2">
      <label className="block text-sm font-medium text-primary">{label}</label>
      <input
        className={cn(
          "py-3 px-4 block w-full border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none focus:ring-1 focus:ring-accent focus:outline-none text-grey-600 mt-2",
          className
        )}
        {...props}
      />
      {isInvalid ? <span className="text-red-600/80 mt-2">{error}</span> : null}
    </div>
  );
}

export default Input;
