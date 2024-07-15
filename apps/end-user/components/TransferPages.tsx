'use client'

import { useRouter } from "next-nprogress-bar";
import { ROUTE_TRANSFER_DEPOSIT, ROUTE_TRANSFER_P2P, ROUTE_TRANSFER_WITHDRAW } from "../constants/routes";
import { usePathname } from "next/navigation";

export default function TransferPages() {
  const router = useRouter();
  const pathname = usePathname();

  const changePage = (route: string) => {
    router.push(route);
  }

  return (
    <div className="text-sm flex gap-4">
      <button onClick={() => changePage(ROUTE_TRANSFER_P2P)} className={`${pathname.includes(ROUTE_TRANSFER_P2P) ? 'bg-gray-800 hover:bg-gray-900 text-white ' : 'bg-[#fbf7f6] hover:bg-white'} px-4 py-2 font-medium rounded-md  shadow-md`}>
        Transfer
      </button>
      <button onClick={() => changePage(ROUTE_TRANSFER_WITHDRAW)} className={`${pathname.includes(ROUTE_TRANSFER_WITHDRAW) ? 'bg-gray-800 hover:bg-gray-900 text-white ' : 'bg-[#fbf7f6] hover:bg-white'} px-4 py-2 font-medium rounded-md  shadow-md`}>
        Withdraw
      </button>
      <button onClick={() => changePage(ROUTE_TRANSFER_DEPOSIT)} className={`${pathname.includes(ROUTE_TRANSFER_DEPOSIT) ? 'bg-gray-800 hover:bg-gray-900 text-white ' : 'bg-[#fbf7f6] hover:bg-white'} px-4 py-2 font-medium rounded-md  shadow-md`}>
        Deposit
      </button>
    </div>
  );
}
