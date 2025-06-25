import { User } from '@/types';
import Description from '@/components/profile/Description';

interface UserProps {
  user: User;
}

export default function Content({ user }: UserProps) {
  return (
    <div className='flex flex-col space-y-2 pl-4'>
      <div className='flex flex-col w-full'>
        <p className='text-2xl'>{user.username}</p>
        <p className='text-xl'>{user.email}</p>
      </div>
      <p className='w-full'>{message}</p>
    </div>
  );
}

const message =
  'This is a placeholder message for the user profile content. It can be replaced with actual user data or any other relevant information.';
