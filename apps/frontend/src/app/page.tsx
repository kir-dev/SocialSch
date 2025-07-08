'use client';
import PostCard from '@/components/PostCard';
import type { Post } from '@/types';
import usePosts from '@/hooks/use-posts';
export default function Home() {
  let { data: posts, isLoading } = usePosts();

  return (
    <main className='flex-1 px-4 md:px-8 py-10 flex flex-col items-center space-y-6 pt-10'>
      {isLoading && <SkeletonCard />}
      {posts &&
        posts.map((post: Post) => {
          return <PostCard key={post.postId} post={post} user={post.author} />;
        })}
    </main>
  );
}

import { SkeletonCard } from '@/components/SkeletonCard';
