import { ReactNode } from "react";
import TransferOptions from "../../../components/TransferOptions";

export default function TransferLayout({ children }: { children: ReactNode }) {
  return <div className="w-full px-10 py-5 flex flex-col gap-4 h-full">
    <TransferOptions />
    {children}
  </div>
}