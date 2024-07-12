import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface CredentialsType {
    phone: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "Mobile Number", type: "text", placeholder: "0000000000" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: CredentialsType | undefined): Promise<User | null> {
                try {
                    if (!credentials) {
                        throw new Error("No credentials provided");
                    }

                    const existingUser = await db.user.findFirst({
                        where: {
                            number: credentials.phone
                        }
                    });

                    if (existingUser) {
                        const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                        if (passwordValidation) {
                            return {
                                id: existingUser.id.toString(),
                                name: existingUser.name,
                                email: existingUser.number
                            };
                        } else {
                            throw new Error('Invalid credentials');
                        }

                    } else {
                        
                        const user = await db.user.create({
                            data: {
                                number: credentials.phone,
                                password: await bcrypt.hash(credentials.password, 10),
                                Balance: {
                                    create: {
                                        amount: 0,
                                        locked: 0,
                                    }
                                }
                            }
                        });

                        return {
                            id: user.id.toString(),
                            name: user.name,
                            email: user.number
                        };

                    }

                } catch (error: any) {
                    if (error.message === 'Invalid credentials') {
                        throw error;
                    }

                    console.error(`Auth error`, error);
                    throw new Error('Something went wrong, try again later');
                }
            }
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token && session.user) {
                session.user.id = token.sub as string;
            }

            return session;
        }
    },
    pages: {
        signIn: '/signin',
    }
};
