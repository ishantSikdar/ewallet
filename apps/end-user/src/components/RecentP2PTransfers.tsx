import { P2PTransferType } from "../lib/interfaces/common";
import P2PTransferBrief from "./P2PTransferBrief";

export default function RecentP2PTransfer({ transfers }: { transfers: P2PTransferType[] }) {
  return (
    <div className="max-h-[400px] min-h-[100px] overflow-y-auto flex flex-col relative">
      {transfers.length === 0 ? (
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">No Recent Transfers</p>
      ) : (

        transfers.map(t => (
          <>
            <P2PTransferBrief
              key={t.id}
              id={t.id}
              amount={t.amount}
              timestamp={t.timestamp}
              user={t.user}
              isReceiver={t.isReceiver}
            />
          </>
        ))
      )}
    </div>
  );
}
