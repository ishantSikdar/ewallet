import { ROUTE_TOKEN, SUB_ROUTE_TRANSACTION_SUCCESS } from "@repo/common/route";
import { Button } from "@repo/ui/Button";
import { InputBox } from "@repo/ui/InputBox";
import axios from "axios";

export default function Amount({
  amount,
  setStage,
  user,
  token,
  isDeposit
}: {
  setStage: (p: number) => void,
  amount: number,
  user: number,
  token: string,
  isDeposit: boolean
  
}) {

  const handleTransaction = async () => {
    try {
      const response = await axios.post(`${process.env.BANK_MOCK_BASE_URL}${ROUTE_TOKEN}${SUB_ROUTE_TRANSACTION_SUCCESS}`, JSON.stringify({
        token: token as string,
        userId: Number(user),
        amount: Number(amount),
        isDeposit: isDeposit,
      }), {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setStage(2);
      } else {
        throw new Error("Something went wrong")
      }
    } catch (error) {
      console.error(error)
      alert(error);
    }
  }

  return <>
    <div className="text-sm">
      <p className="mb-1">Amount</p>
      <InputBox value={(amount/100).toString()} type="text" placeholder="100" onChange={() => ''} lock={true} />
    </div>

    <Button onClick={handleTransaction} className="mt-auto">
      Continue
    </Button>
  </>
}