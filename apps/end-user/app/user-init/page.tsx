'use client'

import { useUserState } from "@repo/store/useUser";
import EditUserPage from "../../components/EditUserPage";

export default function UserInit() {
  const [userState, setUserState] = useUserState();

  return <EditUserPage userState={userState} />
}