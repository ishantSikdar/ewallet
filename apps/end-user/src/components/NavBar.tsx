import MenuItem from "@repo/ui/MenuItem";
import { ROUTE_HOME, ROUTE_TRANSACTIONS, ROUTE_TRANSFER } from "../constants/routes";

export default function NavBar() {
  return (
    <div className="w-60 h-full">
      <div className="mt-10 w-full text-black flex flex-col gap-2 px-5">
        <MenuItem iconKey={'Home'} label={'Home'} route={ROUTE_HOME} />
        <MenuItem iconKey={'Transfer'} label={'Transfer'} route={ROUTE_TRANSFER} />
        <MenuItem iconKey={'Transactions'} label={'Transactions'} route={ROUTE_TRANSACTIONS} />
      </div>
    </div>
  );
}
