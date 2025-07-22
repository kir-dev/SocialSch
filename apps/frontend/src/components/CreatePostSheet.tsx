import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CircleUserRound } from 'lucide-react';
import { useState } from 'react';
import useProfile from '@/hooks/use-profile';
import usePosts from '@/hooks/use-posts';
import { axiosPostFetcher } from '@/lib/fetchers';
import { CreatePost, Post } from '@/types';

export function CreatePostSheet() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { data: user } = useProfile();
  const { mutate } = usePosts();

  const isFormValid = title.trim() !== '' && content.trim() !== '';

  async function handleCreatePost() {
    if (!user || !isFormValid) return;

    const response = await axiosPostFetcher<Post, CreatePost>('/posts', {
      arg: {
        title: title,
        content: content,
        visible: true,
        authorId: user.authSchId,
      },
    });

    await mutate();
    setTitle('');
    setContent('');
    return response;
  }

  function handleCancel() {
    setTitle('');
    setContent('');
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className='flex flex-row items-center w-4/5 gap-2'>
          <CircleUserRound size='32' />
          <Button className='flex-1 rounded-2xl' variant='outline'>
            Do you want to write a post?
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className='min-w-2/5'>
        <SheetHeader>
          <SheetTitle>Create Post</SheetTitle>
          <SheetDescription>Add title and content for your post. Click create when you&apos;re done.</SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4 px-4'>
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
          <div className='grid gap-3 px-1.5'>
            <Label htmlFor='content'>Content</Label>
            <Textarea
              id='content'
              name='content'
              placeholder='Type your content here...'
              value={content}
              className='min-h-[100px]'
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          {isFormValid ? (
            <SheetClose asChild>
              <Button
                type='submit'
                onClick={handleCreatePost}
                className='w-full bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
              >
                Create
              </Button>
            </SheetClose>
          ) : (
            <Button
              type='submit'
              disabled
              className='w-full bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
            >
              Create
            </Button>
          )}

          <SheetClose asChild>
            <Button variant='outline' onClick={handleCancel} className='cursor-pointer'>
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
