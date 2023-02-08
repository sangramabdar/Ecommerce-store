interface CheckOutInputFieldProps {
  name: string;
  value: any;
  onChange: any;
  onBlur: any;
  error: string;
  touched: boolean;
  label: string;
  type: string;
}

function CheckoutInputField({
  name,
  value,
  error,
  onBlur,
  onChange,
  touched,
  label,
  type,
}: Partial<CheckOutInputFieldProps>) {
  const isInvalid = error && touched;

  return (
    <div className="flex flex-col">
      <span className="mb-1">{label}</span>
      <input
        className="border-black border-solid border-2 rounded-md focus:outline-none pl-2"
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        name={name}
        value={value}
      />
      {isInvalid && <span className="text-red-600">{error}</span>}
    </div>
  );
}

export default CheckoutInputField;
