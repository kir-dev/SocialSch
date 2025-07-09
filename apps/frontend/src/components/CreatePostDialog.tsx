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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreatePost, Post } from '@/types';
import { axiosPostFetcher } from '@/lib/fetchers';
import useProfile from '@/hooks/use-profile';
import { useState } from 'react';

export default function CreatePostDialog() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { data: user } = useProfile();

  async function handleCreatePost() {
    if (!user) return;

    const response = await axiosPostFetcher<Post, CreatePost>('/posts', {
      arg: {
        title: title,
        content: content,
        visible: true,
        authorId: user.authSchId,
      },
    });
  }

  function handleCancel() {
    setTitle('');
    setContent('');
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className='bg-[url(/buttonBgImage2.jpg)] bg-cover font-bold text-xl text-white cursor-pointer rounded-2xl px-6 py-2 m-2'>
            Create Post
          </button>
        </DialogTrigger>
        <DialogContent className='min-w-3/5 h-3/5'>
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
            <DialogDescription>
              Add title and content for your post. Click create when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4'>
            <div className='grid gap-3'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                name='title'
                value={title}
                placeholder='Type your title here...'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='username-1'>Content</Label>
              <Textarea
                id='content'
                name='content'
                placeholder='Type your content here...'
                value={content}
                className={'min-h-[100px]'}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'outline'} onClick={() => handleCancel()}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type='submit' onClick={() => handleCreatePost()}>
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
