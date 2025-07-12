import { CircleUserRound } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Post, Comment, CreateComment } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import PostHeader from '@/components/PostHeader';
import React from 'react';
import { format } from 'date-fns';
import useProfile from '@/hooks/use-profile';
import { useRouter } from 'next/navigation';
import usePosts from '@/hooks/use-posts';
import { axiosPostFetcher } from '@/lib/fetchers';

interface PostDetailsProps {
  post: Post;
  comments: Comment[];
}

export function PostDetails({ post, comments }: PostDetailsProps) {
  const [commentText, setCommentText] = React.useState<string>('');
  const { data: user } = useProfile();
  const router = useRouter();
  const { mutate } = usePosts();

  async function handleAddComment() {
    if (!user) {
      router.push('/unauthorized');
      return;
    }

    const response = await axiosPostFetcher<Comment, CreateComment>('/comments', {
      arg: {
        postId: post.postId,
        authorId: user.authSchId,
        content: commentText,
        visible: true,
      },
    });

    await mutate();
    setCommentText('');
    return response;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='text-foreground cursor-pointer text-sm hover:underline'>Comments</button>
      </DialogTrigger>
      <DialogContent
        className='
          min-w-1/2
          h-5/6
          p-0
          flex flex-col
        '
      >
        <DialogHeader className='p-2 pt-6 justify-center items-center'>
          <DialogTitle className='text-2xl'>{post.author.username}&apos;s Post</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col justify-center items-center min-h-0 overflow-y-auto py-2'>
          <Card className='w-4/5'>
            {' '}
            <PostHeader user={post.author} />
            <CardContent>
              <CardTitle className='pb-2 text-xl'>{post.title}</CardTitle>
              <CardDescription className='text-foreground'>{post.content}</CardDescription>
            </CardContent>
          </Card>
        </div>
        <DialogFooter className='!flex !flex-col justify-start items-center'>
          <div className='flex flex-row items-center justify-between mt-4 w-4/5'>
            <div className='w-2/3 flex flex-row justify-start items-center'>
              <CircleUserRound size='32' className='mr-2' />
              <Input
                className='flex-1'
                placeholder='Add a comment...'
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
              />
            </div>
            <button
              className='font-sm px-6 py-1 text-background border-2 bg-foreground rounded-xl cursor-pointer hover:brightness-120'
              onClick={() => handleAddComment()}
            >
              Add
            </button>
          </div>
          <ScrollArea className='w-full max-h-32'>
            <div className='p-4'>
              {comments.length > 0 ? (
                comments.map((comment) => {
                  return (
                    <div key={comment.commentId} className='mb-4'>
                      <div className='flex items-center mb-2'>
                        <CircleUserRound size={24} className='mr-2' />
                        <div>
                          {comment.author ? (
                            <span className='font-medium'>{comment.author.username}</span>
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
                  );
                })
              ) : (
                <p className='text-sm text-muted-foreground'>No comments yet</p>
              )}
            </div>
          </ScrollArea>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
