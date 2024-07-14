'use client'

import { useUserState } from '@repo/store/useUser';
import { ReactNode, useEffect } from "react";
import { splash } from '../lib/actions/user';
import EditUserPage from './EditUserPage';

export default function SplashWrapper({ children }: { children: ReactNode }) {
  const [userState, setUserState] = useUserState();

  useEffect(() => {
    async function getUserState() {
      const userStateResponse = await splash();

      if (userStateResponse) {
        setUserState((p) => ({
          email: userStateResponse.email || '',
          isReady: userStateResponse.isReady,
          name: userStateResponse.name || '',
          number: userStateResponse.number || '',
          lockEmail: !!userStateResponse.email,
          lockNumber: !!userStateResponse.number
        }));
      }
    }

    getUserState();
  }, []);
  
  return <>
    {userState.isReady === false && <EditUserPage />}
    {children}
  </>
}