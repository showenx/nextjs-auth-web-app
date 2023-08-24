import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";

export const authOptions: AuthOptions = {
  providers: [
    AzureADB2CProvider({
      tenantId: process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME,
      clientId: process.env.NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET as string,
      primaryUserFlow: process.env.NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW,
      authorization: {
        params: {
          scope: "offline_access openid",
        },
      },
      checks: ["pkce"],
      client: {
        token_endpoint_auth_method: "none",
      },
    }),
    // Add more providers here if needed
  ],
  pages: {
    signOut: "/auth/signout",
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      console.log(`--- jwt ---`);
      console.log(`token`, token);
      console.log(`account`, account);
      if (account) {
        token.role = "admin";
        // token.secret = process.env.NEXTAUTH_SECRET;
      }

      return Promise.resolve(token);
    },
    async session({ session, token, user }) {
      // session.accessToken = token.accessToken
      // session.user.id = token.id

      console.log(`--- session ---`);

      console.log(`session`, session);
      console.log(`token`, token);

      if (session?.user) {
        const extUer = {
          ...session.user,
          role: token.role,
        };
        session.user = extUer;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log(url);
      console.log(baseUrl);
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
