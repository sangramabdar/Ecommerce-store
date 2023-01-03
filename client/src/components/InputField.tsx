interface InputFieldProps {
  name: string;
  value: string;
  onChange: any;
  onBlur: any;
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
    <div className="flex flex-col h-20 max-w-[250px]">
      <span>{label}</span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
      />
      {isInvalid ? <span>{error}</span> : null}
    </div>
  );
}

export default InputField;
