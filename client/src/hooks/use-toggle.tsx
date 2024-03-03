import { useState } from "react";

function useToggle() {
  let [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }

  function open() {
    setIsOpen(true);
  }
  return { isOpen, open, close };
}

export default useToggle;
