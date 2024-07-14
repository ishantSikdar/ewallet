interface InputProps {
  placeholder?: string,
  className?: string,
  type: string,
  lock?: boolean,
  onChange: (...args: any[]) => void,
  onKeyDown?: (...args: any[]) => void,
}

export function InputBox({ placeholder, className, onChange, onKeyDown, type, lock }: InputProps) {
  return <input
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    type={type}
    placeholder={placeholder}
    className={`h-10 w-full rounded-md bg-[#fbf7f6] p-2 text-sm border-b-2 outline-none ${className}`}
    readOnly={lock} 
    />
}