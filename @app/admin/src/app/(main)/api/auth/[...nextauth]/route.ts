import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@cms/data/prisma';
import NextAuth from 'next-auth';
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
  callbacks: {
    signIn: async ({ user }) => {
      const profile = await prisma.profile.findFirst({
        where: {
          user_id: user.id,
        },
      });

      if (!profile) {
        await prisma.profile.create({
          data: {
            user_id: user.id,
          },
        });
      }

      return true;
    },
    redirect: ({ url, baseUrl }) => {
      return baseUrl;
    },
  },
  pages: {
    signIn: routes.accounts,
  },
});

export { handler as GET, handler as POST };
