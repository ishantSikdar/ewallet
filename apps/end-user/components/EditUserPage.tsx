'use client'

import { useUserState } from '@repo/store/useUser'
import { Button } from '@repo/ui/Button'
import CenterOverlay from '@repo/ui/CenterOverlay'
import IconRegistry from '@repo/ui/Icons'
import { InputBox } from '@repo/ui/InputBox'
import { updateUserInit } from '../lib/actions/user'
import { useState } from 'react'
import { useRouter } from 'next-nprogress-bar'
import { ROUTE_SIGNIN } from '../constants/routes'

export default function EditUserPage() {
  const router = useRouter();
  const [userState, setUserState] = useUserState();
  const [success, setSuccess] = useState<boolean>(false);
  const LockIcon = IconRegistry['Lock'];

  const handleUserUpdate = async () => {
    const response = await updateUserInit(userState.name, userState.email, userState.number);
    setSuccess(true);
  }

  const goToSignInPage = () => {
    setUserState((p) => ({
      ...p,
      isReady: true
    }));
    router.push(ROUTE_SIGNIN);
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
              onChange={(name) => setUserState((p) => ({
                ...p,
                name: name
              }))}
            />
          </div>
          <div>
            <p className='text-sm ms-1'>Email</p>
            <div className='relative'>
              <InputBox
                lock={userState.lockEmail}
                placeholder={userState.email ? userState.email : 'johndoe@mail.com'}
                type='text'
                onChange={(email) => setUserState((p) => ({
                  ...p,
                  email: email
                }))}
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
                onChange={(number) => setUserState((p) => ({
                  ...p,
                  number: number
                }))}
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