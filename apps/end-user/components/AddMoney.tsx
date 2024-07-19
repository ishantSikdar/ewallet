'use client'

import { Button } from "@repo/ui/Button";
import { Select } from "@repo/ui/Select";
import { useState } from "react";
import { createOnRampTransaction } from "../lib/actions/onRampTransactions";
import { InputBox } from "@repo/ui/InputBox";
import Notice from "./Notice";

const SUPPORTED_BANKS = [{
  name: "HDFC Bank",
  redirectUrl: "https://netbanking.hdfcbank.com"
}, {
  name: "Axis Bank",
  redirectUrl: "https://www.axisbank.com/"
}];

export default function AddMoney() {
  const [redirectUrl, setRedirectUrl] = useState<string>(SUPPORTED_BANKS[0]?.redirectUrl || '');
  const [provider, setProvider] = useState<string>(SUPPORTED_BANKS[0]?.name || '');
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAddMoney = async () => {
    const { url } = await createOnRampTransaction(Number(amount), provider);

    if (url) {
      window.open(url, '_blank');
    } else {
      setError("Bank server is down");
    }
  }

  return <>
    <div className="flex flex-col gap-4 pt-2">
      <div>
        <h3 className="text-sm mb-1">Amount</h3>
        <InputBox onChange={setAmount} type="text" placeholder="Amount" />
      </div>

      <div>
        <h3 className="text-sm mb-1">Bank</h3>
        <Select onSelect={(value) => {
          setProvider(value)
          setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        }} options={SUPPORTED_BANKS.map(x => ({
          key: x.name,
          value: x.name
        }))} />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleAddMoney}>
          Add Money
        </Button>
      </div>
    </div>
    {error && <Notice closeCallback={() => setError('')} colorCode={0} text={error} />}
  </>
}