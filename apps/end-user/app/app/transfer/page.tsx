import WhiteCard from "@repo/ui/WhiteCard";
import AddMoney from "../../../components/AddMoney";
import Balance from "../../../components/Balance";
import RecentTransactions from "../../../components/RecentTransactions";
import { getUserBalance } from "../../../lib/actions/userBalance";
import { getRecentOnRampTransactions } from "../../../lib/actions/onRampTransactions";

export default async function Transfer() {
  const userBalance = await getUserBalance();
  const recentOnRamps = await getRecentOnRampTransactions();


  return <div className="w-full flex justify-between p-5">
    <div className="flex flex-col w-[48%]">
      <WhiteCard>
        <h2 className="pb-2 font-medium border-b-2">Add Money</h2>
        <AddMoney />
      </WhiteCard>
    </div>

    <div className="flex flex-col gap-3 w-[48%]">
      <WhiteCard>
        <h2 className="pb-2 font-medium border-b-2">Balance</h2>
        <Balance amount={userBalance.amount || 0} locked={userBalance.locked || 0} />
      </WhiteCard>

      <WhiteCard>
        <h2 className="pb-2 font-medium border-b-2">Recent Transactions</h2>
        <RecentTransactions transactions={recentOnRamps} />
      </WhiteCard>
    </div>
  </div>
}