import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  className?: string;
}

export default function Button(props: ButtonProps) {
  const { children, onClick, type = 'button', className } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-white font-semibold cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
