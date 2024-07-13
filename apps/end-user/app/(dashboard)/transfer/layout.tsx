import { ReactNode } from "react";
import TransferOptions from "../../../components/TransferOptions";

export default function TransferLayout({ children }: { children: ReactNode }) {
  return <div className="w-full px-10 pt-5 flex flex-col gap-4">
    <TransferOptions />
    <div className="w-full h-[1pt] bg-gray-500/20"></div>
    {children}
  </div>
}