import { Button } from '@/components/ui/button';
// import Link from 'next/link';
import { Post } from '@/types';

const posts: Post[] = [
  {
    postId: 1,
    title: 'Post 1',
    content: 'This is the content of post 1',
    visible: false,
    authorId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      authSchId: '1',
      username: 'Author 1',
      email: 'example@gmail.com',
    },
    comments: [],
  },
];

export default async function HomePage() {
  // const posts = axios.get(posts);

  return (
    <div className='flex items-center justify-center min-h-screen bg-secondary'>
      <Button>Click me</Button>
      {/*<ThemeToggle />*/}
      {posts.map((post) => (
        <PostComponent key={post.postId} post={post} author='valaki' title='valami' />
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
