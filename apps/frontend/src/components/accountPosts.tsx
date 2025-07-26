'use client';
import type { Post, User } from '@/types';
import PostCard from '@/components/PostCard';

interface Props {
  userPosts: Post[];
}

export default function AccountPosts({ userPosts }: Props) {
  return (
    <div className='min-w-3/5 pt-12'>
      <div className='flex flex-col w-full items-center gap-4'>
        {userPosts &&
          userPosts.map((post: Post) => {
            return <PostCard key={post.postId} post={post} user={post.author} />;
          })}
      </div>
    </div>
  );
}
