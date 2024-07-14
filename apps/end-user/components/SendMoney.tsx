'use client'

import { Button } from "@repo/ui/Button";
import { InputBox } from "@repo/ui/InputBox";
import { useState } from "react";
import { sendMoneyToUser } from "../lib/actions/userBalance";
import Notice from "./Notice";

export default function SendMoney() {
  const [number, setNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSendMoney = async () => {
    try {
      await sendMoneyToUser(number, Number(amount) * 100);
      setSuccess(`Money sent to ${number}`);

    } catch (error: any) {
      console.error(`Failed to send money`, error);
      setError(error.message);
    }
  }

  return <>
    <div className="mb-2">
      <p className="text-xs ms-1 mb-1 font-medium">Mobile</p>
      <InputBox onChange={setNumber} type="text" placeholder="0000000000" />
    </div>

    <div className="mb-6">
      <p className="text-xs ms-1 mb-1 font-medium">Amount (₹)</p>
      <InputBox onChange={setAmount} type="text" placeholder="100" />
    </div>

    <div className="flex justify-end">
      <Button onClick={handleSendMoney}>
        Send
      </Button>
    </div>

    {error && <Notice colorCode={0} text={error} closeCallback={() => setError('')} />}
    {success && <Notice colorCode={1} text={success} closeCallback={() => setSuccess('')} />}
  </>
}