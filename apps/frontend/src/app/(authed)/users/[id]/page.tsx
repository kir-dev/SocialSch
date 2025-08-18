'use client';

import { useParams } from 'next/navigation';
import useUser from '@/hooks/use-user';
import usePostsByAuthor from '@/hooks/use-postsByAuthor';
import useCommentsByAuthor from '@/hooks/use-commentsByAuthor';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import PostHeader from '@/components/PostHeader';
import AccountPosts from '@/components/accountPosts';
import AccountComments from '@/components/accountComments';

export default function UserProfilePage() {
  const params = useParams<{ id: string }>();
  const userId = params?.id;
  const { data: user } = useUser(userId);
  const { data: posts } = usePostsByAuthor(userId);
  const { data: comments } = useCommentsByAuthor(userId);
  const [showComments, setShowComments] = useState(false);

  if (!user) {
    return <div className='min-w-full w-full flex justify-center pt-16'>Loading...</div>;
  }

  return (
    <div className='bg-background min-h-screen flex flex-row justify-center items-start pt-16'>
      <div className='bg-background min-w-4/5 flex flex-col justify-center items-start'>
        <div className='flex items-center gap-3'>
          <PostHeader user={user} />
        </div>
        <Separator className='my-4 max-w-3xs' />
        <div className='flex h-5 items-center space-x-4 text-sm mb-12'>
          <button
            className='text-lg cursor-pointer hover:underline bg-transparent border-none p-0'
            onClick={() => setShowComments(false)}
          >
            Posts
          </button>
          <Separator orientation='vertical' />
          <button
            className='text-lg cursor-pointer hover:underline bg-transparent border-none p-0'
            onClick={() => setShowComments((s) => !s)}
          >
            Comments
          </button>
        </div>
        {showComments ? (
          <div className='min-w-full grid grid-cols-2 gap-4'>
            <AccountComments userComments={comments ?? []} />
          </div>
        ) : (
          <div className='min-w-full grid grid-cols-2 gap-4'>
            <AccountPosts userPosts={posts ?? []} />
          </div>
        )}
      </div>
    </div>
  );
}
