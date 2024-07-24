'use client'

import { ReactNode } from "react"

interface AppbarProps {
	options: ReactNode
}

export const Appbar = ({ options }: AppbarProps) => {

	return <div className="shadow-md fixed h-16 w-full flex justify-between items-center px-4 md:px-8 bg-[#fbf7f6] z-30">
		<div className='w-[100px] h-full' style={{
			backgroundImage: `url('/app-logo.png')`,
			backgroundPosition: 'center',
			backgroundSize: 'contain',
			backgroundRepeat: 'no-repeat',
		}}></div>

		{options}
	</div>
}