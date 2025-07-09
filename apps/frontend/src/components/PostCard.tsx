import PostHeader from '@/components/PostHeader';
import PostFooter from '@/components/PostFooter';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Post, User } from '@/types';

interface PostProps {
  user: User | undefined;
  post: Post;
}

//Posts should contain like and comment count in the future, two hardcoded value for now
export default function PostCard({ user, post }: PostProps) {
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
      <PostFooter likeCount={123} commentCount={post.comments.length} createdAt={post.createdAt} />
    </Card>
  );
}
