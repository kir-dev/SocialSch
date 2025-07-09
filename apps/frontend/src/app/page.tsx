'use client';
import PostCard from '@/components/PostCard';
import type { Post } from '@/types';
import usePosts from '@/hooks/use-posts';
import { SkeletonCard } from '@/components/SkeletonCard';

export default function Home() {
  let { data: posts, isLoading } = usePosts();

  return (
    <div className='flex flex-col items-center space-y-6 pt-10 pb-10'>
      {isLoading && <SkeletonCard />}
      {posts &&
        posts.map((post: Post) => {
          return <PostCard key={post.postId} post={post} user={post.author} />;
        })}
    </div>
  );
}
