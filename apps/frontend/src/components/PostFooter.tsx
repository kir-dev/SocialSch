import { Heart } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';
import { format } from 'date-fns';

export default function PostFooter({ likeCount, commentCount, createdAt }: PostFooterProps) {
  return (
    <CardFooter className={'flex flex-row justify-between'}>
      <div className={'flex flex-row '}>
        <div className={'flex flex-row'}>
          <p className={'font-bold pr-1'}>{likeCount}</p>
          <Heart className={'text-red-600'} />
        </div>
        <div className={'flex flex-row pl-4'}>
          <p className={'font-bold pr-1 '}>{commentCount}</p>
          <p>Comments</p>
        </div>
      </div>
      <p>{format(createdAt, 'yyyy/MM/dd')}</p>
    </CardFooter>
  );
}

interface PostFooterProps {
  likeCount: number;
  commentCount: number;
  createdAt: Date;
}
