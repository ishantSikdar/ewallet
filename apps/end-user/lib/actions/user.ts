'use server'

import prisma from "@repo/db/client";
import { SplashType } from "../interfaces/TransactionBriefType";
import { getUserServerSession, signOutAndSendToLoginPage } from "./session";


export async function splash(): Promise<SplashType | null> {
    const session = await getUserServerSession();

    const user = await prisma.user.findFirst({
        where: {
            id: Number(session?.user.id),
        }
    });

    if (!user) {
        await signOutAndSendToLoginPage();
        return null;
    }

    return {
        name: user.name,
        number: user.number,
        email: user.email,
        isReady: user.isReady,
    }
}

export async function updateUserInit(name: string, email: string, number: string) {
    const session = await getUserServerSession();

    await prisma.user.update({
        where: { id: Number(session?.user.id) },
        data: {
            isReady: true,
            name: name,
            email: email,
            number: number
        }
    });

    return {
        message: "Success"
    }
}

export async function getUserByNumber(number: string) {
    return await prisma.user.findFirst({
        where: {
            number: {
                startsWith: number
            }
        },
        select: {
            id: true,
            name: true,
            number: true,
            color: true,
        }
    });
}