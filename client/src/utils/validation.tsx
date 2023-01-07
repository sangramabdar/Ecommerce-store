function validateAddress(value: string) {
  if (value.length == 0) return "Required";
  return "";
}

function validatePincode(value: string) {
  if (value.length === 0) return "Required";
  return "";
}
function validateCity(value: string) {
  if (value.length === 0) return "Required";
  return "";
}

export { validateAddress, validateCity, validatePincode };
