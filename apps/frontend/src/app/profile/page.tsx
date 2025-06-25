import type { Post, User } from '@/types';
import Header from '@/components/profile/Header';
import Description from '@/components/profile/Description';
import Content from '@/components/profile/Content';

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
    content:
      'In this post, we explore how decorators work in TypeScript, including their use cases, syntax, and practical examples. You will learn how to create class decorators, method decorators, and how they can be applied to enhance code readability and maintainability in real-world projects.',
    visible: true,
    authorId: 'user_123',
    createdAt: new Date('2024-11-15T10:30:00Z'),
    updatedAt: new Date('2025-11-15T10:30:00Z'),
  },
  {
    postId: 2,
    title: '10 Tips for Better React Performance',
    content:
      'React performance can be improved through memoization, lazy loading, and other techniques. This post covers key optimization tips, such as avoiding unnecessary re-renders, using `React.memo`, efficient state management, code-splitting, and analyzing performance bottlenecks using React DevTools.',
    visible: true,
    authorId: 'user_123',
    createdAt: new Date('2025-01-05T14:20:00Z'),
    updatedAt: new Date('2025-11-15T10:30:00Z'),
  },
  {
    postId: 3,
    title: 'Deploying Next.js with Vercel',
    content:
      'Next.js works seamlessly with Vercel. In this tutorial, we guide you through setting up a Next.js project, connecting it to a GitHub repository, and deploying it to Vercel. Learn about Vercel’s features like instant rollback, edge functions, environment variables, and how to optimize builds.',
    visible: true,
    authorId: 'user_123',
    createdAt: new Date('2025-04-22T08:15:00Z'),
    updatedAt: new Date('2025-11-15T10:30:00Z'),
  },

  {
    postId: 4,
    title: 'Mastering SQL Joins: A Practical Guide',
    content:
      'This post demystifies SQL joins by providing clear explanations and practical examples for INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN. Learn how to combine data from multiple tables efficiently and avoid common pitfalls.',
    visible: true,
    authorId: 'user_123',
    createdAt: new Date('2025-05-10T09:00:00Z'),
    updatedAt: new Date('2025-11-15T10:30:00Z'),
  },
  {
    postId: 5,
    title: 'TypeScript vs. JavaScript: When to Choose Which?',
    content:
      'Explore the key differences between TypeScript and JavaScript, including type safety, tooling, and scalability. This post helps you decide which language best fits your project and team needs.',
    visible: true,
    authorId: 'user_123',
    createdAt: new Date('2025-06-01T12:45:00Z'),
    updatedAt: new Date('2025-11-15T10:30:00Z'),
  },
  {
    postId: 6,
    title: 'Building Reusable React Components',
    content:
      'Learn best practices for creating reusable and maintainable React components. This post covers component composition, props, state management, and how to leverage hooks for cleaner code.',
    visible: true,
    authorId: 'user_123',
    createdAt: new Date('2025-07-18T16:30:00Z'),
    updatedAt: new Date('2025-11-15T10:30:00Z'),
  },
];

const currentUser: User = users[0];

export default function Home() {
  return (
    <main className='flex-1 px-4 md:px-8 flex flex-col items-center space-y-6'>
      <div className='felx-1 max-w-200 rounded-2xl border-2 bg-card shadow-sm'>
        <Header user={currentUser} />
        <Description user={currentUser} />
        <Content posts={getPostsByUserId(currentUser)} />
      </div>
    </main>
  );
}

function getPostsByUserId(user: User): Post[] {
  return posts.filter((post) => post.authorId === user.userId && post.visible);
}
