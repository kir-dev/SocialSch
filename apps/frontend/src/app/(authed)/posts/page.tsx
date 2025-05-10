import { Button } from '@/components/ui/button';
// import Link from 'next/link';
import { Post } from '@/types';

const posts: Post[] = [
  {
    id: '1',
    title: 'Post 1',
    content: 'This is the content of post 1',
  },
];

export default async function HomePage() {
  // const posts = axios.get(posts);

  return (
    <div className='flex items-center justify-center min-h-screen bg-secondary'>
      <Button>Click me</Button>
      {/*<ThemeToggle />*/}
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} author='valaki' title='valami' />
      ))}
    </div>
  );
}

interface PostComponentProps {
  post: Post;
  author: string;
  title: string;
}

function PostComponent({ post /*, author*/ }: PostComponentProps) {
  return (
    <div className='p-4 border rounded'>
      <h2 className='text-lg font-bold'>{post.title}</h2>
      <p>{post.content}</p>
      {/*<Link href={`/users/${post.author.id}`}>{post.author.name}</Link>*/}
    </div>
  );
}
