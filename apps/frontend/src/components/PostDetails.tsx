import { CircleUserRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Post, User } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import PostHeader from '@/components/PostHeader';
import PostFooter from '@/components/PostFooter';
import React from 'react';

interface PostDetailsProps {
  post: Post;
  user: User;
}

// Placeholders
const comments = [
  {
    id: '1',
    text: 'This is a great post!',
    user: {
      username: 'user1',
      userId: 'u1234',
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    text: 'I completely agree with your points!',
    user: {
      username: 'user2',
      userId: 'u5678',
    },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: '3',
    text: 'This is a great post!',
    user: {
      username: 'user3',
      userId: 'u2346',
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    text: 'This is a great post!',
    user: {
      username: 'user4',
      userId: 'u4532',
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

export function PostDetails({ post, user }: PostDetailsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Share</Button>
      </DialogTrigger>
      <DialogContent
        className='
          w-[90vw]
          max-w-[1100px]
          h-[100vh]
          p-0
          flex flex-col
        '
      >
        <DialogHeader className='p-6 justify-center items-center'>
          <DialogTitle>{post.title}</DialogTitle>
        </DialogHeader>
        <div className='flex-1 min-h-0 overflow-y-auto p-6'>
          <Card className='w-full max-w-md '>
            {' '}
            <PostHeader user={user} />
            <CardContent>
              <CardTitle className='pb-2 text-xl'>{post.title}</CardTitle>
              <CardDescription className='text-foreground'>{post.content}</CardDescription>
            </CardContent>
            <PostFooter likeCount={123} commentCount={14} createdAt={post.createdAt} />
          </Card>
          <div className='flex flex-row items-center mt-4 w-full max-w-md'>
            <CircleUserRound size='32' className='mr-2' />
            <Input className='flex-1' placeholder='Write a comment...' />
          </div>
        </div>
        <DialogFooter className='p-1 border-t sm:justify-start flex gap-4'>
          <ScrollArea className=' w-full max-h-64'>
            <div className='p-4'>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className='mb-4'>
                    <div className='flex items-center mb-2'>
                      <CircleUserRound size={24} className='mr-2' />
                      <div>
                        <span className='font-medium'>{comment.user.username}</span>
                        <span className='text-xs text-muted-foreground ml-2'>
                          {comment.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className='text-sm pl-8'>{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className='text-sm text-muted-foreground'>No comments yet</p>
              )}
            </div>
          </ScrollArea>
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
