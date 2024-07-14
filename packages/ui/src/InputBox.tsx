import { useEffect, useRef } from "react"

interface InputProps {
  placeholder?: string,
  className?: string,
  type: string,
  lock?: boolean,
  onChange: (...args: any[]) => void,
  onKeyDown?: (...args: any[]) => void,
  value?: string,
}

export function InputBox({ placeholder, className, onChange, onKeyDown, type, lock, value }: InputProps) {
  const inputBoxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputBoxRef.current && value) {
      inputBoxRef.current.value = value;
    }
  }, [value])

  return <input
    ref={inputBoxRef}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    type={type}
    placeholder={placeholder}
    className={`h-10 w-full rounded-md bg-[#fbf7f6] p-2 text-sm border-b-2 outline-none ${className}`}
    readOnly={lock} 
    />
}