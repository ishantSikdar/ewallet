import MenuItem from "@repo/ui/MenuItem";
import { ROUTE_HOME, ROUTE_P2P_TRANSFER, ROUTE_TRANSACTIONS, ROUTE_TRANSFER } from "../constants/routes";

export default function NavBar() {
  return (
    <div className="mt-10 text-gray-500 flex flex-col gap-1 px-5 font-medium">
      <MenuItem iconKey={'Home'} label={'Home'} route={ROUTE_HOME} />
      <MenuItem iconKey={'Transfer'} label={'Transfer'} route={ROUTE_TRANSFER} />
      <MenuItem iconKey={'Transactions'} label={'Transactions'} route={ROUTE_TRANSACTIONS} />
      <MenuItem iconKey={'P2PTransfer'} label={'P2P Transfer'} route={ROUTE_P2P_TRANSFER} />
    </div>
  );
}
