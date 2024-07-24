'use client'

import { P2PTransferType } from "../lib/interfaces/common"

export default function P2PTransferBrief({ amount, timestamp, name, email, number, isReceiver }: P2PTransferType) {
  let balance = isReceiver ? `+${(amount / 100).toFixed(2)}` : `-${(amount / 100).toFixed(2)}`;

  return <button onClick={() => ''} className="rounded-md p-2 text-sm w-full hover:shadow-md flex justify-between">
    <div className="text-left">
      <p className={`font-medium `}>{name}: <span className="font-normal">{number}</span></p>
      <p className="text-gray-500 text-xs">{timestamp}</p>
    </div>

    <p className={`${isReceiver ? 'text-green-500': 'text-red-500'} font-medium`}>{balance}</p>
  </button>
}