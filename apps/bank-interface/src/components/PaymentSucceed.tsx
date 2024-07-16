import { Button } from "@repo/ui/Button";

export default function PaymentSucceed() {
  return <div className="text-center h-full">
    <div className="py-14">
      <p className="">
        Payment Completed!
      </p>
      <p>
        You can close the window now
      </p>
    </div>
    <Button onClick={() => window.close()} className="mt-auto">
      Close
    </Button>
  </div>
}