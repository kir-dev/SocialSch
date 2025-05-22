import { User } from '@/types';
import NumberString from '@/components/profile/NumberString';
import { CircleUserRound } from 'lucide-react';

interface UserProps {
  user: User;
}

export default function Header({ user }: UserProps) {
  return (
    <div className='flex flex-row justify-between items-center p-5'>
      <CircleUserRound size='160' />
      <div className='flex flex-row items-center space-x-10'>
        {items.map((item) => (
          <NumberString key={item.id} value={item.value} name={item.name} />
        ))}
      </div>
    </div>
  );
}

const items = [
  {
    id: 1,
    name: 'Posts',
    value: 123,
  },
  {
    id: 2,
    name: 'Followers',
    value: 456,
  },
  {
    id: 3,
    name: 'Following',
    value: 789,
  },
];
