import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { hash, verify } from 'argon2';

export async function verifyUser(email: string, password: string): Promise<any> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user?.hashedPassword) return null;
    const ok = await verify(user.hashedPassword, password);
    return ok ? user : null;
}

export async function hashPassword(password: string) {
    return await hash(password);
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;
                return await verifyUser(credentials.email, credentials.password);
            },
        }),
    ],
    session: {
        strategy: 'database',
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
};
