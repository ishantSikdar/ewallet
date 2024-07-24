import { getUserBalance } from "../lib/actions/userBalance";

export default async function Balance() {
  const userBalance = await getUserBalance();

  return <div className="text-sm pt-2">
    <div className="flex justify-between border-slate-300 pb-2">
      <div>
        Unlocked balance
      </div>
      <div>
        {userBalance.amount / 100} INR
      </div>
    </div>
    <div className="flex justify-between border-slate-300 pb-2">
      <div>
        Total Locked Balance
      </div>
      <div>
        {userBalance.locked / 100} INR
      </div>
    </div>
    <div className="flex justify-between border-slate-300">
      <div>
        Total Balance
      </div>
      <div>
        {(userBalance.locked + userBalance.amount) / 100} INR
      </div>
    </div>
  </div>
}