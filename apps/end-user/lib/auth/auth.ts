import db from "@repo/db/client";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { isEmailThenReturn, isMobileThenReturn } from "@repo/common/string";
import { Color, colors } from '@repo/common/color';
import { getRandom } from '@repo/common/array';
import { CredentialsType } from "../interfaces/TransactionBriefType";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "Email or Mobile Number", type: "text", placeholder: "0000000000" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: CredentialsType | undefined): Promise<User | null> {
                try {
                    if (!credentials) {
                        throw new Error("No credentials provided");
                    }

                    const existingUser = await db.user.findFirst({
                        where: {
                            OR: [
                                { number: credentials.phone },
                                { email: credentials.phone }
                            ]
                        }
                    });

                    if (existingUser) {
                        const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password as string);
                        if (passwordValidation) {
                            return {
                                id: existingUser.id.toString(),
                                name: existingUser.name,
                                email: existingUser.email,
                                number: existingUser.number,
                                image: existingUser.color
                            };
                        } else {
                            throw new Error('Invalid credentials');
                        }

                    } else {

                        const user = await db.user.create({
                            data: {
                                email: isEmailThenReturn(credentials.phone),
                                number: isMobileThenReturn(credentials.phone),
                                password: await bcrypt.hash(credentials.password, 10),
                                isReady: false,
                                authProvider: "Credentials",
                                color: getRandom(colors) || Color.CYAN,
                                Balance: {
                                    create: {
                                        locked: 0,
                                        totalBalance: 0,
                                        transactionAmt: 0,
                                    }
                                }
                            }
                        });

                        return {
                            id: user.id.toString(),
                            name: user.name,
                            email: user.email,
                            number: user.number,
                            image: user.color,
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
        }),

        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID || '',
        //     clientSecret: process.env.GOOGLE_SECRET || ''
        // }),
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID || '',
        //     clientSecret: process.env.GITHUB_SECRET || ''
        // })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token.email = user.email as string;
                token.number = user.number as string;
                token.picture = user.image;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token && session.user) {
                session.user.id = token.sub;
                session.user.email = token.email;
                session.user.number = token.number;
                session.user.image = token.picture;
            }
            return session;
        },
        async signIn({ user, account, profile, email, credentials }) {
            if (['google', 'github'].includes(account?.provider as string)) {
                console.log(`provider`, account?.provider);
                const existingUser = await db.user.findFirst({
                    where: {
                        email: profile?.email
                    },
                });
                console.log(`existingUser`, existingUser);

                if (!existingUser) {
                    const newUser = await db.user.create({
                        data: {
                            email: profile?.email,
                            name: profile?.name,
                            color: getRandom(colors) || Color.CYAN,
                            isReady: false,
                            authProvider: account?.provider === 'google' ? "Google" : "Github",
                            Balance: {
                                create: {
                                    locked: 0,
                                    totalBalance: 0,
                                    transactionAmt: 0
                                }
                            }
                        }
                    })
                }
            }
            return true;
        }
    },
    pages: {
        signIn: '/signin',
    }
};
