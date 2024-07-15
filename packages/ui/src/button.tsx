"use client";

import { ReactNode } from "react";

interface ButtonProps {
  className?: string,
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <button onClick={onClick} type="button" className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ${className}`}>
      {children}
    </button>
  );
};
