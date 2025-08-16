import PostHeader from '@/components/PostHeader';
import PostFooter from '@/components/PostFooter';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Post, User } from '@/types';
import useLikeCount from '@/hooks/use-like-count';

interface PostProps {
  user: User | undefined;
  post: Post;
  account?: boolean;
}

export default function PostCard({ user, post }: Readonly<PostProps>) {
  const { data: likeCount } = useLikeCount(post.postId);

  user ??= {
    authSchId: '11undefined11',
    username: 'undefined',
    email: 'undefined@gmail.com',
  };

  return (
    <Card className='bg-background w-4/5'>
      <PostHeader user={user} />
      <CardContent>
        <CardTitle className='pb-2 text-xl'>{post.title}</CardTitle>
        <CardDescription className='text-foreground'>{post.content}</CardDescription>
      </CardContent>
      <PostFooter
        likeCount={likeCount ?? 0}
        commentCount={post.comments.length}
        createdAt={post.createdAt}
        post={post}
      />
    </Card>
  );
}
