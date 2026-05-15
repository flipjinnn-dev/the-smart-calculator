import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { client as sanityClient, isSanityConfigured } from '@/lib/sanity/config';

const hasGoogleOAuth =
  Boolean(process.env.GOOGLE_CLIENT_ID) && Boolean(process.env.GOOGLE_CLIENT_SECRET);

export const authOptions: NextAuthOptions = {
  providers: [
    ...(hasGoogleOAuth
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : [
          CredentialsProvider({
            name: 'Development',
            credentials: {
              email: { label: 'Email', type: 'text' },
              name: { label: 'Name', type: 'text' },
            },
            async authorize(credentials) {
              const email = credentials?.email?.toString() || 'dev@example.com';
              const name = credentials?.name?.toString() || 'Dev User';
              return { id: email, email, name };
            },
          }),
        ]),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!isSanityConfigured) return true;
      if (account?.provider === 'google' && user.email) {
        try {
          const existingUser = await sanityClient.fetch(
            `*[_type == "communityUser" && email == $email][0]`,
            { email: user.email }
          );

          if (!existingUser) {
            await sanityClient.create({
              _type: 'communityUser',
              name: user.name || 'Unknown User',
              email: user.email,
              image: user.image,
              role: 'user',
              createdAt: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error('Error creating/fetching user:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }

      if (!isSanityConfigured) {
        return token;
      }

      if (token.email) {
        try {
          const sanityUser = await sanityClient.fetch(
            `*[_type == "communityUser" && email == $email][0]{
              _id,
              role,
              name,
              image
            }`,
            { email: token.email }
          );

          if (sanityUser) {
            token.role = sanityUser.role;
            token.userId = sanityUser._id;
            token.name = sanityUser.name;
            token.picture = sanityUser.image;
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.userId = token.userId as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
