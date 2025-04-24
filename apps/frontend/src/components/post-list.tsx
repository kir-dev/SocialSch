'use client';

import { Post } from '@/types';
import { useRouter } from 'next/navigation';
import { axios } from '@/lib/axios';
import Link from 'next/link';

export default function PostList({ posts }: { posts: Post[] }) {
  const router = useRouter();

  async function handleCreatePost() {
    // await axios.post<Post[]>('/posts');

    router.push('/posts/create');
  }

  return (
    <>
      <ul className='mt-4'>
        {posts.map((post) => (
          <Link href={`/posts/${post.postId}`} key={post.postId}>
            <li className='p-4 border-b'>
              <h2 className='text-xl font-semibold'>{post.title}</h2>
              <p>{post.content}</p>
            </li>
          </Link>
        ))}
      </ul>
      <button onClick={() => handleCreatePost()} className='cursor-pointer p-2 rounded-lg bg-red-500'>
        Create new post
      </button>
    </>
  );
}
