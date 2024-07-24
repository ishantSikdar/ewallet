import dynamic from "next/dynamic";
import { getRecentOffRampTransactions } from "../../../../lib/actions/offRampTransactions";

const DepositedTable = dynamic(() => import("../../../../components/DepositedTable"), {
  ssr: false
})

export default async function DepositedTransactions() {
  const depositedTransactions = await getRecentOffRampTransactions();

  return <div className="h-full">
    <DepositedTable depositedTransactions={depositedTransactions} />
  </div>
}