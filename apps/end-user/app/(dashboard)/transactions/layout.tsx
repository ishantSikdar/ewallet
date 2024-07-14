import { ReactNode } from "react";
import TransactionPages from "../../../components/TransactionPages";

export default function TransactionsLayout({ children }: { children: ReactNode }) {
  return <div className="w-full px-10 py-5 flex flex-col gap-4 h-full">
  <TransactionPages />
  {children}
</div>
}