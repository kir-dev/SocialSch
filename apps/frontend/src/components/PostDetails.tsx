import { Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Post, User } from '@/types';
import PostCard from '@/components/PostCard';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import PostHeader from '@/components/PostHeader';
import PostFooter from '@/components/PostFooter';

interface PostDetailsProps {
  post: Post;
  user: User;
}

export function PostDetails({ post, user }: PostDetailsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Share</Button>
      </DialogTrigger>
      <DialogContent
        className='
          w-[90vw]    /* Szélesség a viewport 90%-a */
          max-w-[1100px] /* De maximum 1100px széles */
          h-[90vh]    /* Magasság a viewport 90%-a */
          p-0           /* Alapértelmezett padding eltávolítása, hogy a belső elrendezés teljes kontrollt kapjon */
          flex flex-col /* Flexbox a header, content, footer elrendezéséhez */
        '
      >
        <DialogHeader className='p-6 justify-center items-center'>
          <DialogTitle>{post.title}</DialogTitle>
        </DialogHeader>
        {/* Kitölti a helyet, de nem igazítja középre */}
        <div className='flex-1 min-h-0 overflow-y-auto p-6'>
          <Card className='w-full max-w-md'>
            {' '}
            {/* w-full a szélesség kitöltéséhez, max-w-md a méretkorlátozáshoz */}
            <PostHeader user={user} />
            <CardContent>
              <CardTitle className='pb-2 text-xl'>{post.title}</CardTitle>
              <CardDescription className='text-foreground'>{post.content}</CardDescription>
            </CardContent>
            <PostFooter likeCount={123} commentCount={14} createdAt={post.createdAt} />
          </Card>
        </div>
        <DialogFooter className='p-6 border-t sm:justify-start'>
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
