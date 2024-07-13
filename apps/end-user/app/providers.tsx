"use client"
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { Next13ProgressBar } from 'next13-progressbar';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <>
    <RecoilRoot>
      <SessionProvider>
        {children}
      </SessionProvider>
    </RecoilRoot>
    <Next13ProgressBar />
  </>
}