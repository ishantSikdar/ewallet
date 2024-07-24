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
		<div className='w-[100px] h-full' style={{
			backgroundImage: `url('/app-logo.png')`,
			backgroundPosition: 'center',
			backgroundSize: 'contain', 
			backgroundRepeat: 'no-repeat', 
		}}></div>

		<div>
			<Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
		</div>
	</div>
}