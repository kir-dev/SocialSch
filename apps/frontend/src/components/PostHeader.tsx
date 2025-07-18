import { CircleUserRound } from 'lucide-react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/types';

interface PostHeaderProps {
  user: User;
}

export default function PostHeader({ user }: PostHeaderProps) {
  return (
    <CardHeader className='flex flex-row justify-between items-center'>
      <div className='flex flex-row justify-start items-center'>
        <CircleUserRound size='32' />
        <div className='flex flex-col pl-1'>
          <CardTitle>{user.username}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </div>
      </div>
      <Button variant='link' className='p-2'>
        Follow
      </Button>
    </CardHeader>
  );
}
