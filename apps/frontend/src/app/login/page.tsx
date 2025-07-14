'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LuLogIn } from 'react-icons/lu';
import Cookies from 'js-cookie';
import { JWT_COOKIE_NAME } from '@/app/auth/constanst';
import api from '@/lib/axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      setError('Ez a funkció még nem elérhető.');
      setIsLoading(false);
    } catch (err) {
      setError('Hibás email vagy jelszó. Kérjük, próbálja újra.');
      setIsLoading(false);
    }
  }

  function handleAuthSchLogin() {
    router.push('${process.env.NEXT_PUBLIC_API_URL}/auth/login');
  }
}
