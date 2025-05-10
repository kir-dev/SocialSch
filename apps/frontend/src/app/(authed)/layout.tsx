'use client';

import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

export default function AuthedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSignedIn = true;

  useEffect(() => {
    if (!isSignedIn) {
      redirect('/signup');
    }
  }, [isSignedIn]);

  return (
    <div className='flex flex-col min-h-screen bg-gray-400'>
      {/*<Header />*/}
      {children}
    </div>
  );
}
