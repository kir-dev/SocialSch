'use client';
import { Heart } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { PostDetails } from '@/components/PostDetails';
import { Post } from '@/types';
import { useAuth } from '@/hooks/use-auth';
import api from '@/lib/axios';

interface PostFooterProps {
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  post: Post;
}

export default function PostFooter({ likeCount, commentCount, createdAt, post }: PostFooterProps) {
  const [likeNumber, setLikeNumber] = useState(likeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const checkLikeStatus = async () => {
        try {
          // Like számának lekérése
          const countResponse = await api.get(`/likes/count/${post.postId}`);
          setLikeNumber(countResponse.data);

          // Ellenőrizzük, hogy a felhasználó kedvelte-e már a posztot
          const hasLikedResponse = await api.get(`/likes/user-liked/${user.authSchId}/${post.postId}`);
          setIsLiked(hasLikedResponse.data);
        } catch (error) {
          console.error('Error checking like status:', error);
        }
      };

      checkLikeStatus();
    }
  }, [user, post.postId]);

  async function toggleLike() {
    if (!user) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/likes/toggle', {
        userId: user.authSchId,
        postId: post.postId,
      });

      if (response.status === 200 || response.status === 201) {
        setLikeNumber(response.data.count);
        setIsLiked(response.data.liked);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CardFooter className='flex flex-row justify-between'>
      <div className='flex flex-row items-center'>
        <div className='flex flex-row items-center'>
          <p className='font-bold pr-1'>{likeNumber}</p>
          <Button
            className='bg-transparent p-0 cursor-pointer border-0 shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent'
            onClick={toggleLike}
            disabled={isLoading}
            variant='ghost'
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
