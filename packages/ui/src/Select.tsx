"use client"

export const Select = ({ options, onSelect }: {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];

}) => {

  return <select onChange={(e) => {
    onSelect(e.target.value)
  }} className={`h-10 w-full rounded-md bg-[#fbf7f6] p-2 text-sm border-b-2 outline-none`}
  >
    {options.map((option, idx) => <option key={idx} value={option.key}>{option.value}</option>)}
  </select>

}