'use client'

import { Appbar } from "@repo/ui/AppBar";
import { signIn, signOut, useSession } from "next-auth/react"
import { ROUTE_SIGNIN } from "../constants/routes";

export default function AppBar() {
  const session = useSession();

  const signOutUser = async () => {
    await signOut({
      callbackUrl: ROUTE_SIGNIN
    });
  }

  return <Appbar onSignin={signIn} onSignout={signOutUser} user={session.data?.user} />
}