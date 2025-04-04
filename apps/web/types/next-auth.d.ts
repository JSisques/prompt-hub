import 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      username: string;
      bio: string;
      avatar: string;
    };
  }

  interface User {
    id: string;
    email: string;
    username: string;
    name: string;
    bio: string;
    avatar: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    username: string;
    name: string;
    bio: string;
    avatar: string;
  }
}
