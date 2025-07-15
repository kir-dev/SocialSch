'use client';
import PostCard from '@/components/PostCard';
import type { Post } from '@/types';
import usePosts from '@/hooks/use-posts';
import { SkeletonCard } from '@/components/SkeletonCard';
import { CreatePostSheet } from '@/components/CreatePostSheet';

export default function Home() {
  let { data: posts, isLoading } = usePosts();

  if (!posts && !isLoading) return <h1>There are no visible posts. Come back later.</h1>;

  if (posts) {
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return (
    <div className='flex flex-col items-center space-y-6 pt-10 pb-10'>
      <CreatePostSheet />
      {isLoading && <SkeletonCard />}
      {posts &&
        posts.map((post: Post) => {
          return <PostCard key={post.postId} post={post} user={post.author} />;
        })}
    </div>
  );
}
