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
    <div className="text-sm flex gap-2 md:gap-4">
      <button onClick={() => changePage(ROUTE_TRANSACTIONS_TRANSFERED)} className={`${pathname.includes(ROUTE_TRANSACTIONS_TRANSFERED) ? 'bg-gray-800 hover:bg-gray-900 text-white': 'bg-white hover:bg-gray-100' } px-4 py-2 font-medium rounded-md shadow-md transition-colors duration-300 ease-in-out`}>
        P2P
      </button>
      <button onClick={() => changePage(ROUTE_TRANSACTIONS_WITHDRAWLS)} className={`${pathname.includes(ROUTE_TRANSACTIONS_WITHDRAWLS) ? 'bg-gray-800 hover:bg-gray-900 text-white': 'bg-white hover:bg-gray-100' } px-4 py-2 font-medium rounded-md  shadow-md transition-colors duration-300 ease-in-out`}>
        Withdraw
      </button>
      <button onClick={() => changePage(ROUTE_TRANSACTIONS_DEPOSITED)} className={`${pathname.includes(ROUTE_TRANSACTIONS_DEPOSITED) ? 'bg-gray-800 hover:bg-gray-900 text-white': 'bg-white hover:bg-gray-100' } px-4 py-2 font-medium rounded-md  shadow-md transition-colors duration-300 ease-in-out`}>
        Deposit
      </button>
    </div>
  );
}
