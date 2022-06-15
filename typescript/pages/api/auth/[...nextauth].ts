import NextAuth from "next-auth";
import Okta from "next-auth/providers/okta";

export default NextAuth({
  providers: [
    Okta({
      clientId: process.env.NEXT_PUBLIC_OKTA_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_OKTA_CLIENT_SECRET ?? "",
      issuer: process.env.NEXT_PUBLIC_OKTA_ISSUER ?? "",
    }),
  ],
  callbacks: {
    jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.id_token,
        };
      }
      return token;
    },
    session({ session, user, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
