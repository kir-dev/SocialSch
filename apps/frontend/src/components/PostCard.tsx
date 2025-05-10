import PostHeader from '@/components/PostHeader';
import PostFooter from '@/components/PostFooter';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Post, User } from '@/types';

interface PostProps {
  user: User;
  post: Post;
}

//Posts should contain like and comment count in the future, two hardcoded value for now
export default function PostCard({ user, post }: PostProps) {
  return (
    <Card className='w-1/2'>
      <PostHeader user={user} />
      <CardContent>
        <CardTitle className='pb-2 text-xl'>{post.title}</CardTitle>
        <CardDescription className='text-foreground'>{post.content}</CardDescription>
      </CardContent>
      <PostFooter likeCount={123} commentCount={14} createdAt={post.createdAt} />
    </Card>
  );
}
