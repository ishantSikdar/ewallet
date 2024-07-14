'use server'

import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { ROUTE_SIGNIN } from "../../constants/routes";

export async function getUserServerSession() {
    const session = await getServerSession();

    if (!session?.user) {
        await signOut();
        redirect(ROUTE_SIGNIN);
    } else {
        return session;
    }
}