import { ReactNode } from "react";

export default function WhiteCard({ children }: { children: ReactNode }) {
  return <div className="p-5 bg-[#fafafa] rounded-2xl shadow-md">
    {children}
  </div>
}