import WhiteCard from "@repo/ui/WhiteCard";
import AddMoney from "../../../components/AddMoney";
import Balance from "../../../components/Balance";
import RecentTransactions from "../../../components/RecentTransactions";

export default function Transfer() {

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
        <Balance amount={10000} locked={1000} />
      </WhiteCard>

      <WhiteCard>
        <h2 className="pb-2 font-medium border-b-2">Recent Transactions</h2>
        <RecentTransactions />
      </WhiteCard>
    </div>
  </div>
}