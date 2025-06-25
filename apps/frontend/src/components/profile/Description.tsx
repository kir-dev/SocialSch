import { User } from '@/types';
import { Button } from '@/components/ui/button';

interface UserProps {
  user: User;
}

export default function Description({ user }: UserProps) {
  return (
    <div>
      <div className='flex flex-col space-y-2 pl-4'>
        <div className='flex flex-col w-full'>
          <p className='text-2xl'>{user.username}</p>
          <p className='text-xl'>{user.email}</p>
        </div>
        <p className='w-full'>{message}</p>
      </div>
      <hr className='my-4 border-t border-foreground' />
      <div className='flex justify-left pl-4'>
        <Buttons />
      </div>
      <hr className='my-4 border-t border-foreground' />
    </div>
  );
}

const message =
  'This is a placeholder message for the user profile content. It can be replaced with actual user data or any other relevant information.';

function Buttons() {
  return (
    <div className='flex space-x-5'>
      <Button className='text-foreground px-6 py-3 text-lg'>Follow</Button>
      <Button className='text-foreground px-6 py-3 text-lg'>Message</Button>
    </div>
  );
}
