import type { User } from '@/types';
import Header from '@/components/profile/Header';
import Description from '@/components/profile/Description';

export default function Home() {
  return (
    <main className='flex-1 px-4 md:px-8 flex flex-col items-center space-y-6'>
      <div className='felx-1 max-w-200 bg-pink-500 rounded-3xl'>
        <Header user={users[0]} />
        <Description user={users[1]} />
      </div>
    </main>
  );
}

const users = [
  {
    userId: 'user_123',
    email: 'alice@example.com',
    username: 'alice_dev',
  },
  {
    userId: 'user_456',
    email: 'bob@example.com',
    username: 'bobby_codes',
  },
  {
    userId: 'user_789',
    email: 'barni@example.com',
    username: 'barni_dev',
  },
  {
    userId: 'user_999',
    email: 'charlie@example.com',
    username: 'charliex',
  },
];
