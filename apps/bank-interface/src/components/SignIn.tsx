import { Button } from "@repo/ui/Button";
import { InputBox } from "@repo/ui/InputBox";

export default function SignIn({ setStage }: { setStage: (p: number) => void }) {
  return <>
    <div className="text-sm">
      <p className="mb-1">Username</p>
      <InputBox className="h-10 w-full rounded-md bg-[#fbf7f6] p-2 text-sm border-b-2 outline-none " type="text" placeholder="johnDoe@123" onChange={() => ''} />
    </div>

    <div className="text-sm">
      <p className="mb-1">Password</p>
      <InputBox className="h-10 w-full rounded-md bg-[#fbf7f6] p-2 text-sm border-b-2 outline-none " type="password" placeholder="Password" onChange={() => ''} />
    </div>

    <Button onClick={() => setStage(1)} className="mt-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ">
      Continue
    </Button>
  </>
}