import { CircleUserRound, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Post, Comment, CreateComment } from '@/types';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import PostHeader from '@/components/PostHeader';
import React, { useState } from 'react';
import { format } from 'date-fns';
import useProfile from '@/hooks/use-profile';
import { useRouter } from 'next/navigation';
import usePosts from '@/hooks/use-posts';
import { axiosPostFetcher, axiosDeleteFetcher, axiosPatchFetcher } from '@/lib/fetchers';

interface PostDetailsProps {
  post: Post;
  comments: Comment[];
}

export function PostDetails({ post, comments }: PostDetailsProps) {
  const [commentText, setCommentText] = React.useState<string>('');
  const { data: user } = useProfile();
  const router = useRouter();
  const { mutate } = usePosts();
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');

  // Mentésért felelős logika
  async function handleSaveComment() {
    if (!user) {
      router.push('/unauthorized');
      return;
    }

    const payload = { content: editedContent };
    await axiosPatchFetcher(`/comments/${editingCommentId}`, { arg: payload });
    await mutate();
    setEditingCommentId(null);
  }

  //Törlésért felelős logika
  async function handleDeleteComment(commentId: number) {
    if (!user) {
      router.push('/unauthorized');
      return;
    }

    const response = await axiosDeleteFetcher(`/comments/${commentId}`);
    await mutate();
    return response;
  }

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
        <div className='p-4'>
          <Card>
            <PostHeader user={post.author} />
            <CardContent>
              <CardTitle className='pb-2 text-xl'>{post.title}</CardTitle>
              <CardDescription className='text-foreground'>{post.content}</CardDescription>
            </CardContent>
          </Card>
        </div>
        <div className='p-4 border-t'>
          <div className='flex items-center space-x-2'>
            <CircleUserRound size='32' className='mr-2' />
            <Input
              className='flex-1 rounded-xl'
              placeholder='Add a comment...'
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && commentText.trim() !== '') {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
            />
            <button
              type='submit'
              className={`font-sm px-6 py-1 text-background border-2 rounded-xl ${
                commentText.trim() === ''
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-foreground cursor-pointer hover:brightness-120'
              }`}
              onClick={() => handleAddComment()}
              disabled={commentText.trim() === ''}
            >
              Add
            </button>
          </div>
        </div>
        <div className='flex-1 min-h-0 overflow-y-auto p-4 border-t'>
          <div className='p-4'>
            {comments.length > 0 ? (
              comments.map((comment) => {
                //Ezzel nézzük meg hogy az aktuális kommentet szerkesztjük-e
                const isEditing = editingCommentId === comment.commentId;
                return (
                  <div
                    key={comment.commentId}
                    className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-3 items-start group'
                  >
                    {isEditing ? (
                      // ----- SZERKESZTÉSI NÉZET -----
                      <div>
                        <Input
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveComment();
                            if (e.key === 'Escape') setEditingCommentId(null);
                          }}
                          autoFocus
                          className='mb-2 bg-white dark:bg-gray-900'
                        />
                        <div className='flex items-center gap-4'>
                          <button
                            onClick={handleSaveComment}
                            className='text-sm font-semibold text-blue-600 hover:underline'
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingCommentId(null)}
                            className='text-sm text-gray-500 hover:underline'
                          >
                            Undo
                          </button>
                        </div>
                      </div>
                    ) : (
                      // ----- MEGJELENÍTÉSI NÉZET -----
                      <div>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <CircleUserRound size={24} className='mr-2' />
                            <div>
                              <span className='font-medium'>{comment.author?.username || 'Anonymous'}</span>
                              <span className='text-xs text-muted-foreground ml-2'>
                                {format(new Date(comment.createdAt), 'yyyy/MM/dd')}
                              </span>
                            </div>
                          </div>
                          {/* Ez azért nagyon pacek mert ha minden jó akkor a gombok csak a saját kommenteknél jelennek meg*/}
                          {user?.authSchId === comment.author?.authSchId && (
                            <div className='flex items-center opacity-0 group-hover:opacity-100 transition-opacity'>
                              <button
                                onClick={() => {
                                  // Szerkesztési mód be
                                  setEditingCommentId(comment.commentId);
                                  // Input mező feltöltése
                                  setEditedContent(comment.content);
                                }}
                                className='p-1 text-muted-foreground hover:text-blue-500'
                                aria-label='Edit comment'
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteComment(comment.commentId)}
                                className='p-1 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity'
                                aria-label='Delete comment'
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                        <p className='text-sm pl-8 pt-1.5'>{comment.content}</p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className='text-sm text-muted-foreground'>No comments yet</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
