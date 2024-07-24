'use client'

import { Appbar } from "@repo/ui/AppBar";
import { useMenuStatus, useScreenWidth, useSetMenuStatus } from '@repo/store/useApp';
import IconRegistry from "@repo/ui/Icons";
import { Button } from "@repo/ui/Button";
import { signOut } from "next-auth/react";
import { ROUTE_SIGNIN } from "../constants/routes";

export default function AppBar() {
  const screenWidth = useScreenWidth();
  const setMenuStatus = useSetMenuStatus();
  const menuStatus = useMenuStatus();
  const MenuIcon = IconRegistry['Menu'];
  const CrossIcon = IconRegistry['Cross'];

  const toggleMenu = () => {
    setMenuStatus(p => !p);
  }

  const MenuBarToggleBtn = () => {
    return <button onClick={toggleMenu}>
      {MenuIcon && CrossIcon && (menuStatus ? <CrossIcon /> : <MenuIcon />)}
    </button>
  }

  const LogOutBtn = () => {
    return <Button onClick={() => signOut({ callbackUrl: ROUTE_SIGNIN })} className="me-0">
      Log Out
    </Button>
  }

  return <Appbar options={screenWidth < 768 ? <MenuBarToggleBtn /> : <LogOutBtn />} />
}