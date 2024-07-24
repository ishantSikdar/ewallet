import dynamic from "next/dynamic";
import { getUsersAllP2PTransactions } from "../../../../lib/actions/userBalance";

const SentMoneyTable = dynamic(() => import("../../../../components/SentMoneyTable"), {
  ssr: false
})

export default async function TransferedTransactions() {
  const p2pTransactions = await getUsersAllP2PTransactions();

  return <div className="h-full">
    <SentMoneyTable p2pTransactions={p2pTransactions} />
  </div>
}