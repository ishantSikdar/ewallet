import { P2PTransferType } from "../lib/interfaces/TransactionBriefType";

export default function SentMoneyTable({ p2pTransactions }: { p2pTransactions: P2PTransferType[] }) {

  return <div className="max-h-[500px] bg-white rounded-md relative overflow-y-scroll shadow-md  ">
    {p2pTransactions.length === 0 && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">No Transactions</div>}
    <table className="w-full text-center overflow-auto">
      <thead>
        <tr className="w-full  text-white  bg-gray-800 ">
          <td className="py-2 rounded-tl-md border-r-[1pt] border-gray-400">
            Name
          </td>
          <td className="py-2 border-r-[1pt] border-gray-400">
            Email
          </td>
          <td className="py-2 border-r-[1pt] border-gray-400">
            Number
          </td>
          <td className="py-2 border-r-[1pt] border-gray-400">
            Time
          </td>
          <td className="py-2 rounded-tr-md">
            Amount
          </td>
        </tr>
      </thead>
      <tbody>
        {p2pTransactions && p2pTransactions.map((t) =>
          <tr key={t.id} className="bg-white">
            <td className="py-2 border-[1pt]">
              {t.user.name}
            </td>
            <td className="py-2 border-[1pt]">
              {t.user.email}
            </td>
            <td className="py-2 border-[1pt]">
              {t.user.number}
            </td>
            <td className="py-2 border-[1pt]">
              {t.timestamp}
            </td>
            <td className={`py-2 border-[1pt] ${t.isReceiver ? 'text-green-500' : 'text-red-500'}`}>
              {t.isReceiver ? '+' : '-'}{(t.amount/100).toFixed(2)}
            </td>
          </tr>)}
      </tbody>
    </table >
  </div>
}