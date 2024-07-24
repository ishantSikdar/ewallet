import { ReactNode } from "react";
import TransferPages from "../../../components/TransferPages";

export default function TransferLayout({ children }: { children: ReactNode }) {
  return <div className="w-full px-5 md:px-10 py-5 flex flex-col gap-4 h-full">
    <TransferPages />
    {children}
  </div>
}