'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth";
import prisma from "@repo/db/client";

export async function getUserContacts() {
    const session = await getServerSession(authOptions);

    const userContacts = await prisma.contact.findMany({
        where: {
            userId: Number(session?.user.id)
        },
        select: {
            Contact: {
                select: {
                    id: true,
                    name: true,
                    number: true,
                    color: true
                },
            },

        },
        orderBy: {
            Contact: {
                createdAt: "desc"
            }
        }
    });

    return userContacts.map(uc => uc.Contact);
}