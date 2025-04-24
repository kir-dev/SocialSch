import { axios } from '@/lib/axios';
import { Post } from '@/types';
import { notFound } from 'next/navigation';

export default async function PostDetailsPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const post = await axios.get<Post>(`/posts/${postId}`);

  if (!post.data) {
    notFound();
  }

  return (
    <div>
      <h1>Post details page</h1>
      <p>Post ID: {postId}</p>
      <h2 className='text-xl font-semibold'>{post.data.title}</h2>
      <p>{post.data.content}</p>
    </div>
  );
}
