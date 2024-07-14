'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth";
import prisma from "@repo/db/client";
import { redirect } from "next/navigation";
import { ROUTE_SIGNIN } from "../../constants/routes";
import { SplashType } from "../interfaces/TransactionBriefType";


export async function splash(): Promise<SplashType | null> {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findFirst({
        where: {
            id: Number(session?.user.id),
        }
    });

    if (!user) {
        redirect(ROUTE_SIGNIN);
    }

    return {
        name: user.name,
        number: user.number,
        email: user.email,
        isReady: user.isReady,
    }
}

export async function updateUserInit(name: string, email: string, number: string) {
    const session = await getServerSession(authOptions);

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