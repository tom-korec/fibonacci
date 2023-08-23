import React from "react";

interface SubmitButtonProps extends React.PropsWithChildren {
  onClick?: () => void;
  disabled?: boolean;
}

export const SubmitButton = ({ children, disabled, onClick }: SubmitButtonProps) => {
  return (
    <button
      type={"submit"}
      className={"py-2 px-4 rounded-md bg-[hsl(280,100%,70%)] text-slate-100 disabled:bg-[hsl(280,50%,70%)] disabled:cursor-not-allowed"}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
