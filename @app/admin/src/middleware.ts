import { withAuth } from 'next-auth/middleware';
import routes from './utils/routes';

export default withAuth(function middleware() {}, {
  pages: {
    signIn: routes.accounts,
  },
  callbacks: {
    authorized: async ({ token }) => {
      if (!token) {
        return false;
      }

      return true;
    },
  },
});
