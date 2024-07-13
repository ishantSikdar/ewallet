import { Button } from "@repo/ui/Button";
import WhiteCard from "@repo/ui/WhiteCard";
import SendMoney from "../../../../components/SendMoney";

export default function P2PTransfer() {
  return <div className="flex gap-6 justify-between">

    <div className="w-[30%]">
      <WhiteCard>
        <h1 className="border-b-2 pb-1 mb-5 text-lg font-medium">Send</h1>
        <SendMoney />
      </WhiteCard>
    </div>

    <div className="w-[30%] h-full">
      <WhiteCard>
        <h1 className="border-b-2 pb-1 mb-5 text-lg font-medium">Recent Contacts</h1>

        <div className="">

        </div>

      </WhiteCard>
    </div>

    <div className="w-[30%]">
      <WhiteCard>
        <h1 className="border-b-2 pb-1 mb-5 text-lg font-medium">Recent Transactions</h1>


      </WhiteCard>
    </div>
  </div>
}