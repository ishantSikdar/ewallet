"use client"

import Next13ProgressBar from "next13-progressbar"
import SplashWrapper from "../../components/SplashWrapper"

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <>
    <SplashWrapper>
      {children}
    </SplashWrapper>
    <Next13ProgressBar height="4px" color="#0A2FFF" options={{ showSpinner: true }} showOnShallow />
  </>
}