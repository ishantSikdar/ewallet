import DepositedTable from "../../../../components/DepositedTable";
import { getRecentOffRampTransactions } from "../../../../lib/actions/offRampTransactions";

export default async function DepositedTransactions() {
  const depositedTransactions = await getRecentOffRampTransactions();

  return <div className="h-full">
    <DepositedTable depositedTransactions={depositedTransactions} />
  </div>
}