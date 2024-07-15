import WhiteCard from "@repo/ui/WhiteCard";
import AddMoney from "../../../../components/AddMoney";
import Balance from "../../../../components/Balance";
import RecentTransactions from "../../../../components/RecentTransactions";
import { getRecentOnRampTransactions } from "../../../../lib/actions/onRampTransactions";

export default async function Withdraw() {
  const transactions = await getRecentOnRampTransactions();

  return <div className="w-full flex justify-between">
    <div className="flex flex-col w-[48%]">
      <WhiteCard className="">
        <h2 className="pb-2 font-medium border-b-2">Add Money</h2>
        <AddMoney />
      </WhiteCard>
    </div>

    <div className="flex flex-col gap-3 w-[48%]">
      <WhiteCard className="">
        <h2 className="pb-2 font-medium border-b-2">Balance</h2>
        <Balance />
      </WhiteCard>

      <WhiteCard className="">
        <h2 className="pb-2 font-medium border-b-2">Recent Transactions</h2>
        <RecentTransactions transactions={transactions} isDeposit={false} />
      </WhiteCard>
    </div>
  </div>
}