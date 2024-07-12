import TransactionBrief from "./TransactionBrief";

export default function RecentTransactions() {
  return <div className="w-full mt-2">
    <TransactionBrief />
    <TransactionBrief />
    <TransactionBrief />
  </div>
}