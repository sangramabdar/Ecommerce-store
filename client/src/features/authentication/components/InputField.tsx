import cn from "../../../utils/cn";

interface InputFieldProps {
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

function InputField({
  value,
  error,
  touched,
  label,
  className,
  ...props
}: Partial<InputFieldProps>) {
  const isInvalid = error && touched;

  return (
    <div className="flex flex-col mb-2">
      <label className="block text-sm font-medium mb-2 ">{label}</label>
      <input
        className={cn(
          "py-3 px-4 block w-full border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none focus:ring-1 focus:ring-tertiary focus:outline-none text-grey-600",
          className
        )}
        value={value}
        {...props}
      />
      {isInvalid ? <span className="text-red-700">{error}</span> : null}
    </div>
  );
}

export default InputField;
