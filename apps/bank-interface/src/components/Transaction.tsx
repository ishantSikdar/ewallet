import { useBankAppStageState } from "@repo/store/useApp";
import SignIn from "./SignIn";
import Amount from "./Amount";
import PaymentSucceed from "./PaymentSucceed";
import { useSearchParams } from "react-router-dom";

export default function Transaction() {
  const [stage, setStage] = useBankAppStageState();
  const [searchParams] = useSearchParams();
  const amount = parseInt(searchParams.get("f") ?? '0');
  const user = parseInt(searchParams.get("sub") ?? '0');
  const token = searchParams.get('token') as string;
  const isDeposit = searchParams.get('d') === 'true';

  return <div className="w-full h-screen bg-soft-white flex justify-center items-center relative">
    <div className="p-10 w-96 min-h-[330px] shadow-xl bg-white border-gray-300 rounded-lg flex flex-col gap-4 relative">
      <h1 className="text-xl font-bold border-b-2 pb-2">Net Banking</h1>
      {stage === 0 && <SignIn setStage={setStage} />}
      {stage === 1 && <Amount setStage={setStage} amount={amount} user={user} token={token} isDeposit={isDeposit} />}
      {stage === 2 && <PaymentSucceed />}
    </div>
  </div>
}