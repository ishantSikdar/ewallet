import { TransactionsBriefType } from "../lib/interfaces/TransactionBriefType";
import TransactionBrief from "./TransactionBrief";

export default function RecentTransactions({ transactions }: { transactions: TransactionsBriefType[] }) {
  return <div className="w-full mt-2 min-h-32 relative">
    {transactions.length === 0 && <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">No Recent Transactions</p>}
    {transactions.map(t => <TransactionBrief key={t.id} amount={t.amount} id={t.id} provider={t.provider} status={t.status} timestamp={t.timestamp} />)}
  </div>
}