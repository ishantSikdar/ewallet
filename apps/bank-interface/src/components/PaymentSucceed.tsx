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
    <Button onClick={() => window.close()} className="mt-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ">
      Close
    </Button>
  </div>
}