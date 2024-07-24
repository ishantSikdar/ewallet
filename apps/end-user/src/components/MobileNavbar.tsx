'use client'

import { useMenuStatus, useScreenWidth } from "@repo/store/useApp";
import NavBar from "./NavBar";
import { Button } from "@repo/ui/Button";
import { signOut } from "next-auth/react";
import { ROUTE_SIGNIN } from "../constants/routes";

export default function MobileNavbar() {
  const width = useScreenWidth();
  const menuBarStatus = useMenuStatus();

  if (width > 767) {
    return <></>;
  }

  return <div className={`h-full border-x-[1pt] pb-24 fixed flex flex-col justify-between z-30 bg-soft-white transition-transform duration-300 ${menuBarStatus ? 'transform translate-x-0' : 'transform translate-x-full'}`}>
    <div>
      <NavBar />
    </div>
    <div className="px-5">
      <Button onClick={() => signOut({ callbackUrl: ROUTE_SIGNIN })} >
        Log Out
      </Button>
    </div>
  </div >
}