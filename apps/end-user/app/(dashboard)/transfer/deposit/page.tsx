import WhiteCard from "@repo/ui/WhiteCard";
import DepositMoney from "../../../../components/DepositMoney";
import Balance from "../../../../components/Balance";
import RecentTransactions from "../../../../components/RecentTransactions";
import { getRecentOffRampTransactions } from "../../../../lib/actions/offRampTransactions";

export default async function Deposit() {
  const transactions = await getRecentOffRampTransactions();

  return <div className="w-full flex justify-between">
  <div className="flex flex-col w-[48%]">
    <WhiteCard className="">
      <h2 className="pb-2 font-medium border-b-2">Deposit Money</h2>
      <DepositMoney />
    </WhiteCard>
  </div>

  <div className="flex flex-col gap-3 w-[48%]">
    <WhiteCard className="">
      <h2 className="pb-2 font-medium border-b-2">Balance</h2>
      <Balance />
    </WhiteCard>

    <WhiteCard className="">
      <h2 className="pb-2 font-medium border-b-2">Recent Transactions</h2>
      <RecentTransactions transactions={transactions} isDeposit={true} />
    </WhiteCard>
  </div>
</div>
}