import WithdrawlsTable from "../../../../components/WithdrawlsTable";
import { getRecentOnRampTransactions } from "../../../../lib/actions/onRampTransactions";

export default async function WithdrawlsTransactions() {
  const withdrawalTransactions = await getRecentOnRampTransactions();

  return <div className="h-full">
    <WithdrawlsTable withdrawalTransactions={withdrawalTransactions} />
  </div>
}