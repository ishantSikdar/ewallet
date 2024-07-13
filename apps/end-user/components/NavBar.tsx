import MenuItem from "@repo/ui/MenuItem";
import { ROUTE_HOME, ROUTE_SIGNIN, ROUTE_TRANSACTIONS, ROUTE_TRANSFER } from "../constants/routes";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth/auth";
import { redirect } from "next/navigation";

export default async function NavBar() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(ROUTE_SIGNIN);
  } else {
    return (
      <div className="mt-10 w-full text-gray-500 flex flex-col gap-1 px-5 font-medium">
        <MenuItem iconKey={'Home'} label={'Home'} route={ROUTE_HOME} />
        <MenuItem iconKey={'Transfer'} label={'Transfer'} route={ROUTE_TRANSFER} />
        <MenuItem iconKey={'Transactions'} label={'Transactions'} route={ROUTE_TRANSACTIONS} />
      </div>
    );
  }
}
