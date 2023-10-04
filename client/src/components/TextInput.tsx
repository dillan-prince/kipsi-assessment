import { Input } from "@mui/material";
import { useState } from "react";

type TextInputProps = {
  initialValue: string;
  onChange: React.FocusEventHandler<HTMLInputElement>;
};

const TextInput = ({ initialValue, onChange }: TextInputProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onChange}
    />
  );
};

export default TextInput;
