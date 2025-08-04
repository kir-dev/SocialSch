import PostHeader from '@/components/PostHeader';
import PostFooter from '@/components/PostFooter';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Post, User } from '@/types';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';

interface PostProps {
  user: User | undefined;
  post: Post;
}

export default function PostCard({ user, post }: PostProps) {
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await api.get(`/likes/count/${post.postId}`);
        setLikeCount(response.data);
      } catch (error) {
        console.error('Error fetching like count:', error);
      }
    };

    fetchLikeCount();
  }, [post.postId]);

  if (!user) {
    user = {
      authSchId: '11undefined11',
      username: 'undefined',
      email: 'undefined@gmail.com',
    };
  }

  return (
    <Card className='bg-background w-4/5'>
      <PostHeader user={user} />
      <CardContent>
        <CardTitle className='pb-2 text-xl'>{post.title}</CardTitle>
        <CardDescription className='text-foreground'>{post.content}</CardDescription>
      </CardContent>
      <PostFooter likeCount={likeCount} commentCount={post.comments.length} createdAt={post.createdAt} post={post} />
    </Card>
  );
}
