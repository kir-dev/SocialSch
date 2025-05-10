import { PostEntity } from '../../../backend/src/posts/entities/post.entity';
import PostCard from '@/components/PostCard';
import { User } from '../../../backend/src/users/entities/user.entity';

function findUserById(targetId: string): User {
  const user = users.find((user) => user.userId === targetId);
  if (!user) {
    throw new Error(`User with ID '${targetId}' not found.`);
  }
  return user;
}

export default function Home() {
  return (
    <main className='flex-1 px-4 md:px-8 py-10 flex flex-col items-center space-y-6 pt-10'>
      {posts.map((post: PostEntity) => (
        <PostCard key={post.postId} post={post} user={findUserById(post.authorId)} />
      ))}
    </main>
  );
}

//Just some dummy posts and users
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

const posts = [
  {
    postId: 1,
    title: 'Understanding TypeScript Decorators',
    content: 'In this post, we explore how decorators work in TypeScript...',
    visible: true,
    authorId: 'user_123',
    createdAt: new Date('2024-11-15T10:30:00Z'),
    updatedAt: new Date('2025-11-15T10:30:00Z'),
  },
  {
    postId: 2,
    title: '10 Tips for Better React Performance',
    content: 'React performance can be improved through memoization, lazy loading...',
    visible: false,
    authorId: 'user_456',
    createdAt: new Date('2025-01-05T14:20:00Z'),
    updatedAt: new Date('2025-11-15T10:30:00Z'),
  },
  {
    postId: 3,
    title: 'Deploying Next.js with Vercel',
    content: 'Next.js works seamlessly with Vercel. In this tutorial...',
    visible: true,
    authorId: 'user_789',
    createdAt: new Date('2025-04-22T08:15:00Z'),
    updatedAt: new Date('2025-11-15T10:30:00Z'),
  },
];
