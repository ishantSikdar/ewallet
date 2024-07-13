'use client'

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Notice from './Notice';

export default function SignIn() {
  const router = useRouter();
  const [showPasswordStage, setShowPasswordStage] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const continueToPassword = () => {
    setShowPasswordStage(p => !p);
  }

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>, callback: () => void) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      callback();
    }
  };


  const handleSignIn = async () => {
    try {
      const res = await signIn('credentials', {
        phone: phoneNumber,
        password: password,
        redirect: false,
      });

      if (res?.error) {
        console.error('Sign-in error', res.error);
        setError(res.error);

      } else {
        router.push('/');
      }
    } catch (error) {
      console.error(`Login error`, error);
      setError(error instanceof Error ? error.message : 'Unknown Error Occured');
    }
  }

  return <div className="h-screen w-full flex justify-center items-center">
    <div className="min-w-96 border-2 rounded-md px-10 text-center flex flex-col gap-4 py-10 ">

      <Image src={"/app-logo.png"}
        alt="Description of the image"
        width={100}
        height={30}
        className='mx-auto'
      />
      <h1 className="text-lg">Login</h1>

      {!showPasswordStage && <>
        <input onKeyDown={(e) => handleEnterKey(e, continueToPassword)} onChange={(e) => {
          setPhoneNumber(e.target.value);
        }} type="text" name="" id="" className="h-12 bg-inherit rounded-md outline-none border-2 w-full text-sm p-2" placeholder="Enter Mobile Number" />

        <button onClick={continueToPassword} className="rounded-full w-full bg-blue-500 text-white h-10">
          Next
        </button>
      </>}

      {showPasswordStage && <>
        <p className='text-sm'>{phoneNumber}<button onClick={() => setShowPasswordStage(false)} className='text-blue-500 ms-4 font-medium'>Change</button></p>

        <div className='flex flex-col items-start gap-2'>
          <div className='flex w-full'>
            <input onChange={(e) => {
              setPassword(e.target.value);
            }}
              onKeyDown={(e) => handleEnterKey(e, handleSignIn)}
              type={showPassword ? 'text' : 'password'} name="" id="" className="h-12 bg-inherit rounded-l-md outline-none border-2 w-full text-sm p-2" placeholder="Enter Password" />

            <button onClick={() => setShowPassword(p => !p)} className=' border-y-2 border-r-2 rounded-r-md w-12 flex justify-center items-center text-gray-500'>
              {!showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <button className='text-xs text-blue-500 font-bold'>Forgot Password</button>
        </div>

        <button
          onClick={handleSignIn}
          className="rounded-full w-full bg-blue-500 text-white h-10"
        >
          Sign In
        </button>
      </>}
    </div>

    {error &&
      <Notice colorCode={0} text={error} closeCallback={() => setError('')} />
    }
  </div>
}