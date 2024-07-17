'use client'

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import Notice from './Notice';
import { InputBox } from '@repo/ui/InputBox';

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

  const handleCredSignIn = async () => {
    try {
      console.log("using creds")
      const res = await signIn('credentials', {
        phone: phoneNumber,
        password: password,
        redirect: false,
      });

      if (res?.error) {
        console.error('Sign-in error', res.error);
        setError(res.error);

      } else {
        console.log("redirect to home")
        router.push('/');
      }
    } catch (error) {
      console.error(`Login error`, error);
      setError(error instanceof Error ? error.message : 'Unknown Error Occured');
    }
  }


  const handleOAuthSignIn = async (provider: string) => {
    try {
      console.log("using oauth")
      const res = await signIn(provider, {
        redirect: true,
        callbackUrl: "/"
      });

    } catch (error) {
      console.error(`Login error`, error);
      setError(error instanceof Error ? error.message : 'Unknown Error Occured');
    }
  }

  return <div className="h-screen w-full flex justify-center items-center">
    <div className="min-w-96 bg-white shadow-md rounded-md px-10 text-center flex flex-col gap-4 py-10 ">

      <Image src={"/app-logo.png"}
        alt="Description of the image"
        width="0"
        height="0"
        sizes="100vw"
        className="w-32 h-auto mx-auto"
      />
      <h1 className="text-lg">Sign in</h1>

      {!showPasswordStage && <>
        <InputBox onKeyDown={(e) => handleEnterKey(e, continueToPassword)} onChange={setPhoneNumber} type="text" placeholder="Enter Mobile Number" />

        <button onClick={continueToPassword} className="rounded-sm w-full bg-blue-500 text-white h-10">
          Next
        </button>

        <div className='flex items-center'>
          <div className='w-full h-[1pt] bg-gray-400'></div>
          <div className='px-2 text-gray-500'>OR</div>
          <div className='w-full h-[1pt] bg-gray-400'></div>
        </div>

        {/* <button
          onClick={() => handleOAuthSignIn('github')}
          className="relative rounded-sm bg-black w-full  text-white h-10">
          <div className='absolute top-2 left-10'>
            <Image
              src={"/github.jpg"}
              alt="Description of the image"
              width="0"
              height="0"
              sizes="100vw"
              className="h-6 w-6"
            />
          </div>
          <p className='text-center'>
            Sign in with GitHub
          </p>
        </button> */}

        <button
          onClick={() => handleOAuthSignIn('google')}
          className="relative rounded-sm w-full bg-[#4c82e4] text-white h-10">
          <div className='absolute top-2 left-10 bg-white rounded-full p-1'>
            <Image
              src={"/google-logo.webp"}
              alt="Description of the image"
              width="0"
              height="0"
              sizes="100vw"
              className="h-4 w-4"
            />
          </div>
          <p className='text-center'>
            Sign in with Google
          </p>
        </button>
      </>}

      {showPasswordStage && <>
        <p className='text-sm'>{phoneNumber}<button onClick={() => setShowPasswordStage(false)} className='text-blue-500 ms-4 font-medium'>Change</button></p>

        <div className='flex flex-col items-start gap-2'>
          <div className='flex w-full relative'>
            <InputBox onChange={setPassword}
              placeholder='Password'
              onKeyDown={(e) => handleEnterKey(e, handleCredSignIn)}
              type={showPassword ? 'text' : 'password'} />

            <button onClick={() => setShowPassword(p => !p)} className='absolute text-gray-500 right-5 top-3'>
              {!showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <button className='text-xs text-blue-500 font-bold'>Forgot Password</button>
        </div>

        <button
          value={'credentials'}
          onClick={handleCredSignIn}
          className="rounded-sm w-full bg-blue-500 text-white h-10"
        >
          Sign In
        </button>
      </>}
    </div>

    {error &&
      <Notice colorCode={0} text={error} closeCallback={() => setError('')} />}
  </div >
}