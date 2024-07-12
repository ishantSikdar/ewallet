
export default function Balance({ amount, locked }: {
  amount: number;
  locked: number;
}) {

  return <div className="text-sm pt-2">
    <div className="flex justify-between border-slate-300 pb-2">
      <div>
        Unlocked balance
      </div>
      <div>
        {amount / 100} INR
      </div>
    </div>
    <div className="flex justify-between border-slate-300 pb-2">
      <div>
        Total Locked Balance
      </div>
      <div>
        {locked / 100} INR
      </div>
    </div>
    <div className="flex justify-between border-slate-300">
      <div>
        Total Balance
      </div>
      <div>
        {(locked + amount) / 100} INR
      </div>
    </div>
  </div>
}