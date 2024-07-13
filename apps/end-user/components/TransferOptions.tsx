'use client'

import { useRouter } from "next/navigation";
import { ROUTE_TRANSFER_DEPOSIT, ROUTE_TRANSFER_P2P, ROUTE_TRANSFER_WITHDRAW } from "../constants/routes";

export default function TransferOptions() {
  const router = useRouter();

  const changePage = (route: string) => {
    router.push(route);
  }

  return (
    <div className="text-sm flex gap-4">
      <button onClick={() => changePage(ROUTE_TRANSFER_P2P)} className="px-4 py-2 rounded-md bg-white shadow-md">
        Transfer
      </button>
      <button onClick={() => changePage(ROUTE_TRANSFER_WITHDRAW)} className="px-4 py-2 rounded-md bg-white shadow-md">
        Withdraw
      </button>
      <button onClick={() => changePage(ROUTE_TRANSFER_DEPOSIT)} className="px-4 py-2 rounded-md bg-white shadow-md">
        Deposit
      </button>
    </div>
  );
}
