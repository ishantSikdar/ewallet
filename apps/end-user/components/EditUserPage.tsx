'use client'

import { Button } from '@repo/ui/Button'
import CenterOverlay from '@repo/ui/CenterOverlay'
import IconRegistry from '@repo/ui/Icons'
import { InputBox } from '@repo/ui/InputBox'
import { updateUserInit } from '../lib/actions/user'
import { useState } from 'react'
import { ROUTE_SIGNIN } from '../constants/routes'
import { signOut } from 'next-auth/react'

interface UserState {
  name: string;
  email: string | null;
  number: string | null;
  isReady: boolean;
  lockEmail: boolean;
  lockNumber: boolean;
}

export default function EditUserPage({ userState }: { userState: UserState }) {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<string>('');

  const [success, setSuccess] = useState<boolean>(false);
  const LockIcon = IconRegistry['Lock'];

  const handleUserUpdate = async () => {
    const response = await updateUserInit(
      name,
      userState.email ? userState.email : email,
      userState.number ? userState.number : number
    );
    setSuccess(true);
  }

  const goToSignInPage = () => {
    signOut({
      callbackUrl: ROUTE_SIGNIN
    })
  }

  return <CenterOverlay>
    {!success ?
      (<div className='p-10 bg-white rounded-md w-[50%]'>
        <h2 className='text-xl font-bold pb-1 mb-5 border-b-2'>Complete Signing in</h2>
        <div className='flex flex-col gap-3 mb-5'>
          <div>
            <p className='text-sm ms-1'>Name</p>
            <InputBox
              placeholder={userState.name ? userState.name : 'John Doe'}
              type='text'
              onChange={setName}
            />
          </div>
          <div>
            <p className='text-sm ms-1'>Email</p>
            <div className='relative'>
              <InputBox
                lock={userState.lockEmail}
                placeholder={userState.email ? userState.email : 'johndoe@mail.com'}
                type='text'
                onChange={setEmail}
              />
              <div className='absolute top-2 right-4'>
                {userState.lockEmail && LockIcon && <LockIcon color={"#6a7382"} />}
              </div>
            </div>
          </div>
          <div>
            <p className='text-sm ms-1'>Number</p>
            <div className='relative'>
              <InputBox
                lock={userState.lockNumber}
                placeholder={userState.number ? userState.number : '0000000000'}
                type='text'
                onChange={setNumber}
              />
              <div className='absolute top-2 right-4'>
                {userState.lockNumber && LockIcon && <LockIcon color={"#6a7382"} />}
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <Button onClick={handleUserUpdate}>
            Continue
          </Button>
        </div>
      </div>)

      :

      (<div className='p-10 bg-white text-center rounded-md'>
        <div className='mb-8'>
          <p>Your details have been updated</p>
          <p>Please re-login to continue</p>
        </div>
        <Button onClick={goToSignInPage}>
          Continue
        </Button>
      </div>)}

  </CenterOverlay>
}