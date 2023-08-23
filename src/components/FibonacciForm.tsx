import { useState } from "react";

import { SubmitButton } from "~/components/SubmitButton";
import { NumberInput } from "~/components/NumberInput";

interface FibonacciFormProps {
  handleSubmit: (n: number) => void;
}

export const FibonacciForm = ({ handleSubmit }: FibonacciFormProps) => {
  const [inputValue, setInputValue] = useState<number>(1);

  return (
    <form
      className={"flex items-center gap-4"}
      onSubmit={(e) => {
        e.preventDefault();

        // check validation here

        handleSubmit(inputValue);
      }}
    >
      <NumberInput
        value={inputValue}
        onChange={(numberValue) => {
          setInputValue(numberValue);
        }}
      />
      <SubmitButton disabled={inputValue < 0}>Calculate</SubmitButton>
    </form>
  );
};
