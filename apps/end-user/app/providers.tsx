"use client"
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <>
    <RecoilRoot>
      <SessionProvider>
        {children}
      </SessionProvider>
    </RecoilRoot>
    <ProgressBar
        height="4px"
        color="#00c0f1"
        options={{ showSpinner: false }}
        shallowRouting
      />
  </>
}