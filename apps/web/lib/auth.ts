import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const response = await fetch(process.env.NEXT_PUBLIC_API_URL ?? '', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
                mutation Login($email: String!, $password: String!) {
                  login(email: $email, password: $password) {
                    id
                    email
                    username
                    name
                    avatar
                    bio
                  }
                }
              `,
              variables: {
                email: credentials.email,
                password: credentials.password,
              },
            }),
          });

          const data = await response.json();
          const user = data.data?.login;

          if (user) {
            return {
              id: user.id,
              email: user.email,
              username: user.username,
              name: user.name,
              avatar: user.avatar,
              bio: user.bio,
            };
          }

          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.bio = user.bio;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
        session.user.username = token.username as string;
        session.user.bio = token.bio as string;
        session.user.avatar = token.avatar as string;
      }
      return session;
    },
  },
};
