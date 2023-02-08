function validateAddress(value: string) {
  if (value.length == 0)
    return {
      valid: false,
      error: "Required",
    };
  return {
    valid: true,
    error: "",
  };
}

function validatePincode(value: string) {
  if (value.length === 0)
    return {
      valid: false,
      error: "Required",
    };
  return {
    valid: true,
    error: "",
  };
}

function validateCity(value: string) {
  if (value.length === 0)
    return {
      valid: false,
      error: "Required",
    };
  return {
    valid: true,
    error: "",
  };
}

export { validateAddress, validateCity, validatePincode };
