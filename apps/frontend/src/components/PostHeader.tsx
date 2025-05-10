import { CircleUserRound } from 'lucide-react';
import { User } from '../../../backend/src/users/entities/user.entity';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PostHeaderProps {
  user: User;
}

export default function PostHeader({ user }: PostHeaderProps) {
  return (
    <CardHeader className={'flex flex-row justify-start items-center'}>
      <CircleUserRound size='32' />
      <div className='flex flex-col'>
        <CardTitle>{user.username}</CardTitle>
        <CardDescription>{user.userId}</CardDescription>
      </div>
    </CardHeader>
  );
}
