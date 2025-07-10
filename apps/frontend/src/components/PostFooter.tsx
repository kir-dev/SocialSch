'use client';
import { Heart } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { PostDetails } from '@/components/PostDetails';
import { Post, User } from '@/types';

interface PostFooterProps {
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  user: User;
  post: Post;
}

export default function PostFooter({ likeCount, commentCount, createdAt, post, user }: PostFooterProps) {
  const [likeNumber, setLikeNumber] = useState(likeCount);
  const [isLiked, setIsLiked] = useState(false);

  function toggleLike() {
    if (isLiked) {
      setLikeNumber(likeCount);
      setIsLiked(false);
    } else {
      setLikeNumber(likeCount + 1);
      setIsLiked(true);
    }
  }

  return (
    <CardFooter className='flex flex-row justify-between'>
      <div className='flex flex-row items-center'>
        <div className='flex flex-row items-center'>
          <p className='font-bold pr-1'>{likeNumber}</p>
          <Button
            className='bg-transparent p-0 cursor-pointer border-0 shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent'
            asChild
            onClick={() => toggleLike()}
          >
            <Heart className={isLiked ? 'text-red-600 fill-red-600' : 'text-red-600'} size='16' />
          </Button>
        </div>
        <div className='flex flex-row justify-center items-center pl-5'>
          <span className='font-bold pr-1'>{commentCount}</span>
          <PostDetails post={post} comments={post.comments} />
        </div>
      </div>
      <span className='text-foreground/24 text-xs px-2'>{format(createdAt, 'yyyy/MM/dd')}</span>
    </CardFooter>
  );
}
