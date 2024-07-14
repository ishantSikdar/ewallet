import { P2PTransferType } from "../lib/interfaces/TransactionBriefType";

export default function SentMoneyTable({ p2pTransactions }: { p2pTransactions: P2PTransferType[] }) {

  return <div className="h-full bg-white rounded-md relative overflow-hidden shadow-md  ">
    {p2pTransactions.length === 0 && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">No Transactions</div>}
    <table className="w-full text-center overflow-auto">
      <thead>
        <tr className="w-full  text-white  bg-gray-800 ">
          <td className="py-2 rounded-tl-md">
            Name
          </td>
          <td className="py-2">
            Email
          </td>
          <td className="py-2">
            Number
          </td>
          <td className="py-2">
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
            <td className="py-2">
              {t.user.name}
            </td>
            <td className="py-2">
              {t.user.email}
            </td>
            <td className="py-2">
              {t.user.number}
            </td>
            <td className="py-2">
              {t.timestamp}
            </td>
            <td className={`py-2 ${t.isReceiver ? 'text-green-500' : 'text-red-500'}`}>
              {t.isReceiver ? '+' : '-'}{t.amount}
            </td>
          </tr>)}
      </tbody>
    </table >
  </div>
}