'use client';
import type { Post, User } from '@/types';
import PostCard from '@/components/PostCard';

interface Props {
  userPosts: Post[];
}

export default function AccountPosts({ userPosts }: Props) {
  return (
    <>
      {userPosts &&
        userPosts.map((post: Post) => {
          return <PostCard key={post.postId} post={post} user={post.author} account={true} />;
        })}
    </>
  );
}
