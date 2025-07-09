'use client';

import useProfile from '@/hooks/use-profile';
import { useRouter } from 'next/navigation';
import CreatePostDialog from '@/components/CreatePostDialog';

export default function SideBarButton() {
  const { data: user } = useProfile();
  const router = useRouter();

  function handleLogin() {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`);
  }

  return (
    <>
      {user && <CreatePostDialog />}
      {!user && (
        <button
          className='bg-[url(/buttonBgImage2.jpg)] bg-cover font-bold text-xl text-white cursor-pointer rounded-2xl px-6 py-2 m-2'
          onClick={() => handleLogin()}
        >
          <span>Login</span>
        </button>
      )}
    </>
  );
}
