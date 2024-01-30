interface InputFieldProps {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  error: string;
  touched: boolean;
  label: string;
  type: string;
}

function InputField({
  name,
  value,
  error,
  onBlur,
  onChange,
  touched,
  label,
  type,
}: Partial<InputFieldProps>) {
  const isInvalid = error && touched;

  return (
    <div className="flex flex-col h-20 max-w-[250px] mb-2">
      <span className="mb-1">{label}</span>
      <input
        className="border-black border-solid border-2 rounded-md focus:outline-none pl-2"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
      />
      {isInvalid ? <span className="text-red-600">{error}</span> : null}
    </div>
  );
}

export default InputField;
