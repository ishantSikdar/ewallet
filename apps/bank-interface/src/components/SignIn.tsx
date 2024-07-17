import { Button } from "@repo/ui/Button";
import { InputBox } from "@repo/ui/InputBox";

export default function SignIn({ setStage }: { setStage: (p: number) => void }) {
  return <>
    <div className="text-sm">
      <p className="mb-1">Username</p>
      <InputBox type="text" placeholder="johnDoe@123" onChange={() => ''} />
    </div>

    <div className="text-sm">
      <p className="mb-1">Password</p>
      <InputBox type="password" placeholder="Password" onChange={() => ''} />
    </div>

    <Button onClick={() => setStage(1)} className="mt-auto">
      Continue
    </Button>
  </>
}