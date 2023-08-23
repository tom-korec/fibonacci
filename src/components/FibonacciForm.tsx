import { useState } from "react";

import { SubmitButton } from "~/components/SubmitButton";
import { NumberInput } from "~/components/NumberInput";
import { fibonacciInputNumberSchema } from "~/validation";

interface FibonacciFormProps {
  handleSubmit: (n: number) => void;
}

export const FibonacciForm = ({ handleSubmit }: FibonacciFormProps) => {
  const [inputValue, setInputValue] = useState<number>(1);

  const isValid = fibonacciInputNumberSchema.safeParse(inputValue).success;

  return (
    <form
      className={"flex items-center gap-4"}
      onSubmit={(e) => {
        e.preventDefault();

        if (isValid) {
          handleSubmit(inputValue);
        }
      }}
    >
      <NumberInput
        value={inputValue}
        onChange={(numberValue) => {
          setInputValue(numberValue);
        }}
      />
      <SubmitButton disabled={!isValid}>Calculate</SubmitButton>
    </form>
  );
};
