import { useSession } from 'next-auth/react';
export default function useAuth() {
  const { data: session, status } = useSession();
  // console.log(session?.user.role);
  if (!session || !session.user)
    return {
      user: null,
      status,
    };
  return {
    user: session.user,
    status,
  };
}
