import type { User } from '@/types';
import Header from '@/components/profile/Header';
import Content from '@/components/profile/Content';

export default function Home() {
  return (
    <main className='flex-1 px-4 md:px-8 flex flex-col items-center space-y-6'>
      <div className='felx-1 max-w-200 rounded-3xl bg-card'>
        <Header user={users[0]} />
        <Content user={users[0]} />
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
