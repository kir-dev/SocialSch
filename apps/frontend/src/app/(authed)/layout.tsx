'use client';

import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSignedIn = true;

  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      redirect('/signup');
      router.push('/signup');
    }
  }, [isSignedIn]);

  return (
    <div className='flex flex-col min-h-screen bg-gray-400'>
      {/*<Header />*/}
      {children}
    </div>
  );
}
