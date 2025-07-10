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
import { Post, User, Comment } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import PostHeader from '@/components/PostHeader';
import React from 'react';
import { format } from 'date-fns';

interface PostDetailsProps {
  post: Post;
  comments: Comment[];
}

export function PostDetails({ post, comments }: PostDetailsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='text-foreground cursor-pointer text-sm hover:underline'>Comments</button>
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
            <PostHeader user={post.author} />
            <CardContent>
              <CardTitle className='pb-2 text-xl'>{post.title}</CardTitle>
              <CardDescription className='text-foreground'>{post.content}</CardDescription>
            </CardContent>
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
                  <div key={comment.commentId} className='mb-4'>
                    <div className='flex items-center mb-2'>
                      <CircleUserRound size={24} className='mr-2' />
                      <div>
                        {comment.user ? (
                          <span className='font-medium'>{comment.user.username}</span>
                        ) : (
                          <span className='font-medium'>Anonymous</span>
                        )}
                        <span className='text-xs text-muted-foreground ml-2'>
                          {format(comment.createdAt, 'yyyy/MM/dd')}
                        </span>
                      </div>
                    </div>
                    <p className='text-sm pl-8'>{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className='text-sm text-muted-foreground'>No comments yet</p>
              )}
            </div>
          </ScrollArea>
          <DialogClose asChild />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
