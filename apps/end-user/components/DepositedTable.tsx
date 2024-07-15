import { OffRampTransaction, P2PTransferType } from "../lib/interfaces/TransactionBriefType";

export default function DepositedTable({ depositedTransactions }: { depositedTransactions: OffRampTransaction[] }) {

  return <div className="h-full bg-white rounded-md relative overflow-hidden shadow-md  ">
    {depositedTransactions.length === 0 && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">No Transactions</div>}
    <table className="w-full text-center overflow-auto">
      <thead>
        <tr className="w-full  text-white  bg-gray-800 ">
          <td className="py-2 rounded-tl-md border-r-[1pt] border-gray-400">
            Bank
          </td>
          <td className="py-2 border-r-[1pt] border-gray-400">
            Time
          </td>
          <td className="py-2 border-r-[1pt] border-gray-400">
            Status
          </td>
          <td className="py-2 rounded-tr-md ">
            Amount
          </td>
        </tr>
      </thead>
      <tbody>
        {depositedTransactions && depositedTransactions.map((t) =>
          <tr key={t.id} className="bg-white">
            <td className="py-2 border-[1pt]">
              {t.provider}
            </td>
            <td className="py-2 border-[1pt]">
              {t.timestamp}
            </td>
            <td className="py-2 border-[1pt]">
              {t.status}
            </td>
            <td className={`py-2 ${t.status === 'Pending' ? 'text-yellow-500' : t.status === 'Success' ? 'text-green-500' : 'text-red-500'}  border-[1pt]`}>
              -{t.amount}
            </td>
          </tr>)}
      </tbody>
    </table >
  </div>
}