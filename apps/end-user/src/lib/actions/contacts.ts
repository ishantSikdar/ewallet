'use server'

import prisma from "@repo/db/client";
import { getUserServerSession } from "./session";

export async function getUserContacts() {
    const session = await getUserServerSession();

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