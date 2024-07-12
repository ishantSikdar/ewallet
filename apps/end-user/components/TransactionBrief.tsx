'use client'

import { TransactionsBriefType } from "../lib/interfaces/TransactionBriefType"



export default function TransactionBrief({ amount, provider, status, timestamp }: TransactionsBriefType) {
  return <button onClick={() => ''} className="rounded-md p-2 text-sm w-full hover:shadow-md flex justify-between">
    <div className="text-left">
      <p>{amount >= 0 ? 'Received INR' : 'Sent INR'}</p>
      <p className="text-gray-500 text-xs">{timestamp}</p>
    </div>

    <p>{amount >= 0 ? '+' : '-'} {Math.abs(amount)}</p>
  </button>
}