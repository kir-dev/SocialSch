'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LuLogIn } from 'react-icons/lu';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Itt még nincs implementálva a hagyományos bejelentkezés a backend-en
      setError('Ez a funkció jelenleg fejlesztés alatt áll.');
      setIsLoading(false);
    } catch (err) {
      setError('Hibás email vagy jelszó. Kérjük, próbálja újra.');
      setIsLoading(false);
    }
  }

  function handleAuthSchLogin() {
    // Az AuthSch bejelentkezés útvonala
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`);
  }

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-center text-2xl'>Bejelentkezés</CardTitle>
          <CardDescription className='text-center'>Add meg az adataidat a bejelentkezéshez</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='email@példa.hu'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Jelszó</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className='text-sm text-red-500'>{error}</p>}
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Bejelentkezés...' : 'Bejelentkezés'}
            </Button>
          </form>

          <div className='mt-6 flex items-center'>
            <Separator className='flex-grow' />
            <span className='mx-4 text-sm text-gray-500'>vagy</span>
            <Separator className='flex-grow' />
          </div>

          <Button onClick={handleAuthSchLogin} variant='outline' className='mt-4 w-full'>
            Bejelentkezés AuthSch fiókkal
            <LuLogIn className='ml-2' />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
