import { Post } from '@/types';
import { Button } from '@/components/ui/button';

interface PostProps {
  posts: Post[];
}

export default function ({ posts }: PostProps) {
  return (
    <div className='grid grid-cols-4 gap-2'>
      {posts.map((post) => (
        <Button
          key={post.postId}
          className='bg-gray-500 p-4 rounded-lg text-center w-full h-full whitespace-normal text-foreground'
          type='button'
        >
          {post.title}
        </Button>
      ))}
    </div>
  );
}
