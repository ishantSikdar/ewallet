'use client'

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";
import { ROUTE_HOME, ROUTE_SIGNIN } from "../constants/routes";
import { useEffect } from "react";

export default function RootHome() {
  const router = useRouter();
  const { data: session, status } = useSession(); // Destructure data and status from useSession

  useEffect(() => {
    // Only perform redirection when session status is 'authenticated'
    if (!session || !session.user) {
      signOut({
        callbackUrl: ROUTE_SIGNIN
      });
    } else {
      router.push(ROUTE_HOME);
    }
  }, [session, status, router]);

  return <div>Loading...</div>;
}
