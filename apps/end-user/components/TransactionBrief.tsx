'use client'

export default function TransactionBrief() {
  return <button onClick={() => ''} className="rounded-md p-2 text-sm w-full hover:shadow-md flex justify-between">
    <div className="text-left">
      <p>Recieved INR</p>
      <p className="text-gray-500 text-xs">Sat Mar 30 2024</p>
    </div>

    <p>+ Rs 200</p>
  </button>
}