'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { LuLogIn, LuLogOut, LuUser } from 'react-icons/lu';
import useProfile from '@/hooks/use-profile';
import Cookies from 'js-cookie';
import { JWT_COOKIE_NAME } from '@/app/auth/constanst';

export default function LoginButton() {
  const { data: user, mutate } = useProfile();
  const router = useRouter();

  function navigateToProfile() {
    router.push('/profile');
  }

  function navigateToLogin() {
    router.push('/login');
  }

  function handleLogout() {
    Cookies.remove(JWT_COOKIE_NAME);
    mutate();
    router.push('/login');
  }

  return (
    <>
      {user && (
        <div className='flex gap-2 items-center'>
          <Button onClick={navigateToProfile}>
            <LuUser className='mr-2' />
            {user.username || 'Profil'}
          </Button>
          <Button variant='outline' onClick={handleLogout}>
            <LuLogOut className='mr-2' /> Kijelentkezés
          </Button>
        </div>
      )}
      {!user && (
        <Button className='ml-0 max-md:m-2' onClick={navigateToLogin}>
          Bejelentkezés
          <LuLogIn className='ml-2' />
        </Button>
      )}
    </>
  );
}
