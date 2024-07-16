import { useBankAppStageState } from "@repo/store/useApp"
import { Button } from "@repo/ui/Button"
import { InputBox } from "@repo/ui/InputBox"
import SignIn from "./components/SignIn";
import Amount from "./components/Amount";
import PaymentSucceed from "./components/PaymentSucceed";

function App() {
  const [stage, setStage] = useBankAppStageState();

  return (
    <div className="w-full h-screen bg-soft-white flex justify-center items-center relative">
      <div className="p-10 w-96 min-h-[330px] shadow-xl bg-white border-gray-300 rounded-lg flex flex-col gap-4 relative">
        <h1 className="text-xl font-bold border-b-2 pb-2">Net Banking</h1>
        {stage === 0 && <SignIn setStage={setStage} />}
        {stage === 1 && <Amount setStage={setStage} />}
        {stage === 2 && <PaymentSucceed />}
      </div>
    </div>
  )
}

export default App
