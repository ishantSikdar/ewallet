import WhiteCard from "@repo/ui/WhiteCard";
import UserPortfolio from "../../../components/UserPortfolio";
import { getUserBalanceOvertime } from "../../../lib/actions/userBalance";
import { getIST } from '@repo/common/date';
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth/auth";

export default async function Home() {
  const userBalance = await getUserBalanceOvertime();
  const session = await getServerSession(authOptions);

  const latestBalance = userBalance[userBalance.length - 1];
  const currentBalance = latestBalance?.totalBalance || 0;

  let greet = '';
  const currHour = getIST().getHours();

  if (currHour >= 0 && currHour < 12) {
    greet = 'Good Morning, ';
  } else if (currHour >= 12 && currHour < 16) {
    greet = 'Good Afternoon, ';
  } else if (currHour >= 16 && currHour < 20) {
    greet = 'Good Evening, ';
  } else {
    greet = 'Welcome back, ';
  }

  return <div className="w-full h-full p-5">
    <h2 className="text-3xl text-purple-900 font-bold p-5">{greet}{session?.user.name}</h2>
    <WhiteCard className="">
      <div className="mb-5 ms-2 ">
        <h2 className="font-medium text-sm text-gray600">Balance</h2>
        <h2 className="text-gray-600 font-medium text-2xl">₹ <span className="text-black">{(currentBalance/100).toFixed(2)}</span></h2>
      </div>
      <UserPortfolio userBalance={userBalance} />
      <div className="h-40"></div>
    </WhiteCard>
  </div>
}