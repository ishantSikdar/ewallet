'use client'

import { useScreenWidth } from "@repo/store/useApp";
import { RampTransaction } from "../lib/interfaces/common";
import { useState } from "react";

export default function DepositedTable({ depositedTransactions }: { depositedTransactions: RampTransaction[] }) {
  return <div className="text-sm">
    {depositedTransactions.map(transaction => <TableRow key={transaction.id} transaction={transaction} />)}
  </div>
}


export function TableRow({ transaction }: { transaction: RampTransaction }) {
  const [rowStatus, setRowStatus] = useState<boolean>(false);
  const width = useScreenWidth();
  const isMobile = width < 768;

  return (
    <button
      onClick={() => setRowStatus((p) => !p)}
      className="w-full rounded-lg shadow-lg bg-white hover:bg-gray-100 transition-colors duration-300 ease-in-out"
    >
      <div className="flex justify-between md:justify-around items-center py-4 px-6 border-b border-gray-200">
        <p className="font-medium text-gray-800">{transaction.timestamp}</p>
        <p className="text-gray-600">{transaction.status}</p>
        {!isMobile && (
          <>
            <p className="text-gray-600">{transaction.provider}</p>
          </>
        )}
        <p className={`font-semibold ${transaction.status === 'Success' ? 'text-green-500' : transaction.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>{(transaction.amount / 100).toFixed(2)}</p>
      </div>

      <div className={`transition-max-height duration-300 ease-in-out overflow-hidden ${rowStatus ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="h-1 bg-gray-100 mb-1"></div>
        <div className="px-6 py-4 text-gray-700 text-left">
        <p className="text-sm">Transaction ID: <span className="font-semibold">{transaction.id}</span></p>
          <p className="text-sm">Bank: <span className="font-semibold">{transaction.provider}</span></p>
          <p className="text-sm">Time: <span className="font-semibold">{transaction.timestamp}</span></p>
          <p className="text-sm">Status: <span className="font-semibold">{transaction.status}</span></p>
          <p className="text-sm">Amount: <span className={`font-semibold ${transaction.status === 'Success' ? 'text-green-500' : transaction.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>{(transaction.amount / 100).toFixed(2)}</span></p>
        </div>
      </div>
    </button>
  );
}