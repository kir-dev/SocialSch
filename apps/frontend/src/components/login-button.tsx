'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { LuLogIn, LuUser } from 'react-icons/lu';
import useProfile from '@/hooks/use-profile';

export default function LoginButton() {
  const { data: user } = useProfile();
  const router = useRouter();

  function navigateToProfile() {
    router.push('/profile');
  }

  function navigateToLogin() {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`);
  }

  return (
    <>
      {user && (
        <div className='flex gap-2 items-center'>
          <Button onClick={navigateToProfile}>
            <LuUser />
          </Button>
        </div>
      )}
      {!user && (
        <Button className='ml-0 max-md:m-2' onClick={navigateToLogin}>
          Bejelentkezés
          <LuLogIn />
        </Button>
      )}
    </>
  );
}
