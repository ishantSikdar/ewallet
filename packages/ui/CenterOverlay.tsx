import { ReactNode } from "react";

export default function CenterOverlay({ children }: { children: ReactNode}) {
  return (
    <div className='z-40 fixed inset-0 flex justify-center items-center bg-opacity-80 bg-gray-500'>
      {children}
    </div>
  )
}