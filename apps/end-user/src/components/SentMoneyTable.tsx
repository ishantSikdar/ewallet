'use client'

import { useState } from "react";
import { P2PTransferType } from "../lib/interfaces/common";
import { useScreenWidth } from "@repo/store/useApp";


export default function SentMoneyTable({ p2pTransactions }: { p2pTransactions: P2PTransferType[] }) {
  return <div className="text-sm">
    {p2pTransactions.map(transaction => <TableRow key={transaction.id} transaction={transaction} />)}
  </div>
}

export function TableRow({ transaction }: { transaction: P2PTransferType }) {
  const [rowStatus, setRowStatus] = useState<boolean>(false);
  const width = useScreenWidth();
  const isMobile = width < 768;

  return (
    <button
      onClick={isMobile ? () => setRowStatus((p) => !p): () => ''}
      className="w-full rounded-lg shadow-lg bg-white hover:bg-gray-100 transition-colors duration-300 ease-in-out"
    >
      <div className="flex justify-between md:justify-around items-center py-4 px-6 border-b border-gray-200">
        <p className="font-medium text-gray-800">{transaction.name}</p>
        {!isMobile && (
          <>
            <p className="text-gray-600">{transaction.number}</p>
            <p className="text-gray-600">{transaction.timestamp}</p>
          </>
        )}
        <p className={`font-semibold ${transaction.isReceiver ? 'text-green-500' : 'text-red-500'}`}>{transaction.isReceiver ? '+' : '-'}{(transaction.amount / 100).toFixed(2)}</p>
      </div>

      <div className={`transition-max-height duration-300 ease-in-out overflow-hidden ${rowStatus ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="h-1 bg-gray-100 mb-1"></div>
        <div className="px-6 py-4 text-gray-700 text-left">
          <p className="text-sm">Transaction ID: <span className="font-semibold">{transaction.id}</span></p>
          <p className="text-sm">Name: <span className="font-semibold">{transaction.name}</span></p>
          <p className="text-sm">Number: <span className="font-semibold">{transaction.number}</span></p>
          <p className="text-sm">Time: <span className="font-semibold">{transaction.timestamp}</span></p>
          <p className="text-sm">Amount: <span className={`font-semibold ${transaction.isReceiver ? 'text-green-500' : 'text-red-500'}`}>{(transaction.amount / 100).toFixed(2)}</span></p>
        </div>
      </div>
    </button>
  );
}