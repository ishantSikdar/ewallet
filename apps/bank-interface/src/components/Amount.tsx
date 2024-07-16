import { Button } from "@repo/ui/Button";
import { InputBox } from "@repo/ui/InputBox";

export default function Amount({ setStage }: { setStage: (p: number) => void }) {
  return <>
    <div className="text-sm">
      <p className="mb-1">Enter amount</p>
      <InputBox type="text" placeholder="100"  onChange={() => ''} />
    </div>

    <Button onClick={() => setStage(2)} className="mt-auto">
      Continue
    </Button>
  </>
}