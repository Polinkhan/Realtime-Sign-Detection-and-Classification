import { useState } from "react";

// ------------------------------------------------------------------
// useToggle custom hook for managing a toggle state.
// The state can represent whether a component is open or closed.
// The hook provides functions to open, close, and toggle the state.
// ------------------------------------------------------------------
const useToggle = () => {
  const [open, setOpen] = useState(false);
  const [resource, setResource] = useState<any>();

  const onOpen = (res?: any) => {
    setOpen(true);
    if (res) setResource(res);
  };

  const onClose = () => setOpen(false);

  const onToggle = () => setOpen((prev) => !prev);

  return { open, onOpen, onToggle, onClose, resource, setResource };
};

export default useToggle;
