import { ReactNode } from "react";

export default function Div({ children }: { children: ReactNode }): JSX.Element {
  return <div className="text-xl">
    {children}
  </div>
}