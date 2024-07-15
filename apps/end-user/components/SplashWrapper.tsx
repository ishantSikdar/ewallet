import { ReactNode } from "react";
import { splash } from '../lib/actions/user';
import EditUserPage from './EditUserPage';

export default async function SplashWrapper({ children }: { children: ReactNode }) {
  const userState = await splash();

  const user = {
    name: userState?.name || '',
    email: userState?.email || '',
    number: userState?.number || '',
    isReady: userState?.isReady || false,
    lockEmail: !!userState?.email || false,
    lockNumber: !!userState?.number || false,
  }

  return <>
    {userState?.isReady === false && <EditUserPage userState={user} />}
    {children}
  </>
}