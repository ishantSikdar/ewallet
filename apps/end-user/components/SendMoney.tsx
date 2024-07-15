'use client'

import { Button } from "@repo/ui/Button";
import { InputBox } from "@repo/ui/InputBox";
import { useEffect, useState } from "react";
import { sendMoneyToUser } from "../lib/actions/userBalance";
import Notice from "./Notice";
import { UserPublicType } from "../lib/interfaces/TransactionBriefType";
import { getUserByNumber } from "../lib/actions/user";
import ContactCard from "./ContactCard";
import { useSendMoneyInputState } from "@repo/store/useApp";

export default function SendMoney() {
  const [number, setNumber] = useSendMoneyInputState();
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [recieverUser, setRecieverUser] = useState<UserPublicType | null>()

  const getRecieverUser = async () => {
    const user = await getUserByNumber(number);
    setRecieverUser(user);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (number) {
        getRecieverUser();
      }
    }, 500);

    return () => {
      clearInterval(timer);
    }
  }, [number]);

  const fillNumber = () => {
    if (recieverUser) {
      setNumber(recieverUser.number || '');
    }
  }


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
    {recieverUser &&
      <>
        <p className="text-xs font-medium">Receiver</p>
        <button onClick={fillNumber} className="mb-4 w-full">
          {<ContactCard color={recieverUser.color} id={recieverUser.id} name={recieverUser.name} number={recieverUser.number} />}
        </button>
      </>
    }

    <div className="mb-2">
      <p className="text-xs ms-1 mb-1 font-medium">Mobile</p>
      <InputBox value={number} onChange={setNumber} type="text" placeholder="0000000000" />
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