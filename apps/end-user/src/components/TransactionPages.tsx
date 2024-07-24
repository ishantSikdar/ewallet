'use client'

import { useRouter } from "next-nprogress-bar";
import { ROUTE_TRANSACTIONS_DEPOSITED, ROUTE_TRANSACTIONS_TRANSFERED, ROUTE_TRANSACTIONS_WITHDRAWLS, ROUTE_TRANSFER_DEPOSIT, ROUTE_TRANSFER_P2P, ROUTE_TRANSFER_WITHDRAW } from "../constants/routes";
import { usePathname } from "next/navigation";

export default function TransactionPages() {
  const router = useRouter();
  const pathname = usePathname();

  const changePage = (route: string) => {
    router.push(route);
  }

  return (
    <div className="text-sm flex gap-4">
      <button onClick={() => changePage(ROUTE_TRANSACTIONS_TRANSFERED)} className={`${pathname.includes(ROUTE_TRANSACTIONS_TRANSFERED) ? 'bg-gray-800 hover:bg-gray-900 text-white ': 'bg-[#fbf7f6] hover:bg-white' } px-4 py-2 font-medium rounded-md shadow-md`}>
        Sent/Received
      </button>
      <button onClick={() => changePage(ROUTE_TRANSACTIONS_WITHDRAWLS)} className={`${pathname.includes(ROUTE_TRANSACTIONS_WITHDRAWLS) ? 'bg-gray-800 hover:bg-gray-900 text-white': 'bg-[#fbf7f6] hover:bg-white' } px-4 py-2 font-medium rounded-md  shadow-md`}>
        Withdrawls
      </button>
      <button onClick={() => changePage(ROUTE_TRANSACTIONS_DEPOSITED)} className={`${pathname.includes(ROUTE_TRANSACTIONS_DEPOSITED) ? 'bg-gray-800 hover:bg-gray-900 text-white': 'bg-[#fbf7f6] hover:bg-white' } px-4 py-2 font-medium rounded-md  shadow-md`}>
        Deposited
      </button>
    </div>
  );
}
