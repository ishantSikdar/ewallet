import { OffRampTransaction } from "../lib/interfaces/TransactionBriefType";
import TransactionBrief from "./TransactionBrief";

export default async function RecentTransactions({ transactions, isDeposit }: { transactions : OffRampTransaction[], isDeposit: boolean }) {
  return <div className="w-full h-72 relative overflow-y-scroll">
    {transactions.length === 0 && <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">No Recent Transactions</p>}
    {transactions.map(t => <TransactionBrief key={t.id} amount={t.amount} id={t.id} status={t.status} timestamp={t.timestamp} isDeposited={isDeposit} />)}
  </div>
}