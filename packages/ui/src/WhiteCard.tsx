import { ReactNode } from "react";

export default function WhiteCard({ children, className }: { children: ReactNode, className: string  }) {
  return <div className={`p-5 bg-[#fafafa] rounded-2xl shadow-md ${className}`}>
    {children}
  </div>
}