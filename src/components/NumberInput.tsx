import React, { useState } from "react";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const NumberInput = ({ value, onChange }: NumberInputProps) => {
  const [localValue, setLocalValue] = useState(value.toString());

  return (
    <input
      className={"w-[8rem] rounded-md px-4 py-2"}
      type={"number"}
      value={localValue}
      onChange={(e) => {
        const value = e.target.value;

        setLocalValue(value);

        const numberValue = Number(value);

        if (value !== "" && !isNaN(numberValue)) {
          onChange(numberValue);
        }
      }}
      onBlur={() => {
        if (localValue !== value.toString()) {
          setLocalValue(value.toString());
        }
      }}
    />
  );
};
