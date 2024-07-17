'use client'

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";
import { ROUTE_EDIT_USER_INIT, ROUTE_HOME, ROUTE_SIGNIN } from "../constants/routes";
import { useEffect } from "react";
import { useUserState } from '@repo/store/useUser';
import { splash } from "../lib/actions/user";
import { authOptions } from "../lib/auth/auth";

export default function RootHome() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userState, setUserState] = useUserState();

  async function getUserReadiness() {
    const userStateResponse = await splash();
    setUserState({
      email: userStateResponse?.email as string,
      isReady: userStateResponse?.isReady || false,
      name: userStateResponse?.name as string,
      number: userStateResponse?.number as string,
      lockEmail: !!userStateResponse?.email,
      lockNumber: !!userStateResponse?.number
    });

    if (userStateResponse?.isReady) {
      router.push(ROUTE_HOME);
    } else {
      router.push(ROUTE_EDIT_USER_INIT);
    }
  }

  useEffect(() => {
    if (session !== undefined) {
      console.log(`session`, session);
      if (session === null) {
        signOut({
          callbackUrl: ROUTE_SIGNIN
        });
      } else {
        getUserReadiness();
      }
    }
  }, [session]);

  return <>
    Loading...
  </>
}
