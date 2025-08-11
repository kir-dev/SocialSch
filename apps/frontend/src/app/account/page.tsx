'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import useProfile from '@/hooks/use-profile';
import usePosts from '@/hooks/use-posts';
import type { Post, Comment } from '@/types';
import { Separator } from '@/components/ui/separator';
import useComments from '@/hooks/use-comments';
import AccountComments from '@/components/accountComments';
import AccountPosts from '@/components/accountPosts';
import { useState } from 'react';
import useCommentsByAuthor from '@/hooks/use-commentsByAuthor';
import usePostsByAuthor from '@/hooks/use-postsByAuthor';

export default function AccountPage() {
  const { data: user } = useProfile();

  const userId = user?.authSchId ?? '';
  const { data: posts } = usePostsByAuthor(userId);
  const { data: comments } = useCommentsByAuthor(userId);

  const [commentsCLick, setCommentsCLick] = useState(false);

  let userPosts: Post[] = [];
  let userComments: Comment[] = [];
  if (posts) {
    userPosts = posts.filter((post) => post.authorId === user?.authSchId);
  }
  if (comments) {
    userComments = comments.filter((comment) => comment.authorId === user?.authSchId);
  }

  if (!user) {
    return (
      <div className='min-w-full w-full flex justify-center pt-16 text-red-600 font-bold text-2xl'>
        Please log in to access this pagge
      </div>
    );
  }

  return (
    <div className='bg-background min-h-screen flex flex-row justify-center items-start pt-16'>
      <div className='bg-background min-w-4/5 flex flex-col justify-center items-start'>
        <Avatar className='h-32 w-32 rounded-lg'>
          <AvatarFallback className='rounded-lg text-6xl font-bold'>{user?.username[0]}</AvatarFallback>
        </Avatar>
        <div className='grid flex-1 text-left text-3xl leading-tight pt-6'>
          <span className='truncate font-medium'>{user?.username}</span>
          <span className='truncate text-lg'>{user?.email}</span>
        </div>
        <div className='pt-12 pb-20 flex flex-row justify-start items-center text-2xl font-bold'>
          <p className='pr-12'>{userPosts.length} posts</p>
          <p>123 likes</p>
        </div>
        <Separator className='my-4 max-w-3xs' />
        <div className='flex h-5 items-center space-x-4 text-sm mb-12'>
          <div className='text-lg cursor-pointer hover:underline' onClick={() => setCommentsCLick(false)}>
            Posts
          </div>
          <Separator orientation='vertical' />
          <div
            className='text-lg cursor-pointer hover:underline'
            onClick={() => setCommentsCLick((prevState) => !prevState)}
          >
            Comments
          </div>
        </div>
        {commentsCLick && (
          <div className='min-w-full grid grid-cols-2 gap-4'>
            <AccountComments userComments={userComments} />
          </div>
        )}
        {!commentsCLick && (
          <div className='min-w-full grid grid-cols-2 gap-4'>
            <AccountPosts userPosts={userPosts} />
          </div>
        )}
      </div>
    </div>
  );
}
