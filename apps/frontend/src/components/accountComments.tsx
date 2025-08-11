import { Comment } from '@/types';
import { format } from 'date-fns';

interface Props {
  userComments: Comment[];
}

export default function AccountComments({ userComments }: Props) {
  return (
    <>
      {userComments.map((comment: Comment) => (
        <div key={comment.commentId} className='bg-sidebar rounded-xl flex flex-col items-start justify-center p-4 '>
          <p className='text-[16px] pb-2'>{comment.content}</p>
          <p className='text-foreground/24 text-xs italic'>{format(comment.createdAt, 'yyyy/MM/dd')}</p>
        </div>
      ))}
    </>
  );
}
