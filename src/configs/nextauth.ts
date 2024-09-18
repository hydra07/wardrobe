import AuthService from '@/services/auth.service';
import { AuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';

const authService = new AuthService();

const authOptions: AuthOptions = {
  // secret: process.env.SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    maxAge: 2 * 60 * 60, // 2 giờ
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!account) return false;
      const { isAuthenticated, message } = await authService.authenticate(
        {
          name: user.name as string,
          email: user.email as string,
          image: user.image as string,
        },
        {
          provider: account.provider as string,
          providerAccountId: account.providerAccountId as string,
        },
      );
      return isAuthenticated;
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = await authService.generateToken({
          provider: account.provider as string,
          providerAccountId: account.providerAccountId as string,
        });
      }
      // triggered
      const decoded = await authService.decode(token.accessToken as string);
      token.role = decoded.role;
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.role = token.role as string[];
      return session;
    },
  },
};

export default authOptions;
