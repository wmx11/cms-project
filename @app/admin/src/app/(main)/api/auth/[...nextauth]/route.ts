import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@cms/packages/data/prisma';
import NextAuth, { Profile } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import routes from '../../../../../utils/routes';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: (process.env.GOOGLE_CLIENT_ID as string) || '',
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) || '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  events: {
    createUser: async ({ user }) => {
      try {
      } catch (error) {
        console.error('next_auth_createUser', error);
      }
    },
  },
  callbacks: {
    signIn: async ({ user, profile, account }) => {
      if (user.email && account?.provider === 'google') {
        return (profile as Profile & { email_verified: boolean })
          .email_verified;
      }

      return false;
    },

    redirect: ({ url, baseUrl }) => {
      return baseUrl;
    },
    jwt: async ({ token, account, profile }) => {
      return token;
    },
    session: ({ session, token, user }) => {
      return session;
    },
  },
  pages: {
    signIn: routes.accounts,
  },
});

export { handler as GET, handler as POST };
