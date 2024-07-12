'use client'

import { TransactionsBriefType } from "../lib/interfaces/TransactionBriefType"

export default function TransactionBrief({ amount, provider, status, timestamp }: TransactionsBriefType) {
  let headline: string = '';
  let headlineColor: string = '';
  let amountColor: string = '';

  if (status === 'Pending') {
    headline = 'Transfer Pending';
    amountColor = 'text-yellow-500';
    headlineColor = 'text-yellow-500';

  } else if (status === 'Success') {
    headline = amount >= 0 ? 'Received INR' : 'Sent INR';
    amountColor = amount > 0 ? 'text-green-500' : 'text-red-500';
    headlineColor = 'text-green-500';

  } else if (status === 'Failure') {
    headline = 'Transfer Failed';
    amountColor = '';
    headlineColor = 'text-red-500';
  }

  return <button onClick={() => ''} className="rounded-md p-2 text-sm w-full hover:shadow-md flex justify-between">
    <div className="text-left">
      <p className={`font-medium ${headlineColor}`}>{headline}</p>
      <p className="text-gray-500 text-xs">{timestamp}</p>
    </div>

    <p className={`${amountColor} font-medium ${status === 'Failure' && 'line-through'}`}>{amount >= 0 ? '+' : '-'} {Math.abs(amount) / 100}</p>
  </button>
}