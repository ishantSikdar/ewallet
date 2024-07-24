import SentMoneyTable from "../../../../components/SentMoneyTable";
import { getUsersAllP2PTransactions } from "../../../../lib/actions/userBalance";

export default async function TransferedTransactions() {
  const p2pTransactions = await getUsersAllP2PTransactions();

  return <div className="h-full">
    <SentMoneyTable p2pTransactions={p2pTransactions} />
  </div>
}