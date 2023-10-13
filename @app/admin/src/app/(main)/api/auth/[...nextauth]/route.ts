import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@cms/data/prisma';
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
        const existingProfile = await prisma.profile.findFirst({
          where: {
            user: {
              email: user.email,
            },
          },
        });

        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email || '',
          },
          select: {
            id: true,
          },
        });

        if (!existingProfile && existingUser) {
          await prisma.profile.create({
            data: {
              user_id: existingUser.id,
            },
          });
        }
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
      const user = await prisma.user.findUnique({
        where: {
          email: token.email || '',
        },
        select: {
          profile: {
            select: {
              id: true,
            },
          },
        },
      });

      Object.assign(token, { profileId: user?.profile?.id });

      return token;
    },
    session: ({ session, token, user }) => {
      if (token && session.user) {
        Object.assign(session.user, { profileId: token.profileId });
      }

      return session;
    },
  },
  pages: {
    signIn: routes.accounts,
  },
});

export { handler as GET, handler as POST };
