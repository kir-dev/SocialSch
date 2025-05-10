import PostHeader from '@/components/PostHeader';
import { PostEntity } from '../../../backend/src/posts/entities/post.entity';
import PostFooter from '@/components/PostFooter';
import { User } from '../../../backend/src/users/entities/user.entity';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

interface PostProps {
  user: User;
  post: PostEntity;
}

//Posts should contain like and comment count in the future, two hardcoded value for now
export default function PostCard({ user, post }: PostProps) {
  return (
    <Card className='w-1/2'>
      <PostHeader user={user} />
      <CardContent>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription className={'text-foreground'}>{post.content}</CardDescription>
      </CardContent>
      <PostFooter likeCount={123} commentCount={14} createdAt={post.createdAt} />
    </Card>
  );
}
