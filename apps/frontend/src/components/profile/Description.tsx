import { User } from '@/types';

interface UserProps {
  user: User;
}

export default function Description(props: UserProps) {
  return (
    <div className='flex flex-col space-y-2 p-5 rounded-3xl'>
      <p className='text-2xs'>{message}</p>
    </div>
  );
}

const message =
  '☀️ Bringing Entertainment and News to a community of millionsaskjfvasuibfviasbfkjasbfkjasbfbaskjbfkajsbfkjlasbfkabksfla 🫂';
