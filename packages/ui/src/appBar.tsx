'use client'

import Image from 'next/image';
import { Button } from './Button';

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="shadow-md fixed h-16 w-full flex justify-between items-center px-8 bg-[#fbf7f6] z-30">
        <Image
            src={"/app-logo.png"}
            alt="Description of the image"
            width={80}
            height={100}
            style={{ height: 'auto' }}
        />

        <div>
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}