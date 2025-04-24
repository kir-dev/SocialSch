import { axios } from '@/lib/axios';
import { Post } from '@/types';
import PostList from '@/components/post-list';

export default async function PostsPage() {
  const posts = await axios.get<Post[]>('/posts');

  return (
    <main className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-2xl font-bold'>Posts</h1>
      <PostList posts={posts.data} />
    </main>
  );
}
