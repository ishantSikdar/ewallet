import dynamic from "next/dynamic";
import { getRecentOnRampTransactions } from "../../../../lib/actions/onRampTransactions";

const WithdrawlsTable = dynamic(() => import("../../../../components/WithdrawlsTable"), {
  ssr: false
});

export default async function WithdrawlsTransactions() {
  const withdrawalTransactions = await getRecentOnRampTransactions();

  return <div className="h-full">
    <WithdrawlsTable withdrawalTransactions={withdrawalTransactions} />
  </div>
}