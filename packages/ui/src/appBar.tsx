'use client'

import Image from 'next/image';
import { Button } from './Button';

interface AppbarProps {
	user?: {
		name?: string | null;
	},
	onSignin: () => void,
	onSignout: () => void
}

export const Appbar = ({
	user,
	onSignin,
	onSignout
}: AppbarProps) => {
	return <div className="shadow-md fixed h-16 w-full flex justify-between items-center px-8 bg-[#fbf7f6] z-30">
		<div className='w-[100px]'>
			<Image
				src={"/app-logo.png"}
				alt="Description of the image"
				width="0"
				height="0"
				sizes="100vw"
				className="w-full h-auto"
			/>
		</div>

		<div>
			<Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
		</div>
	</div>
}