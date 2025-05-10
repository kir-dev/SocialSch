import { Heart } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

export default function PostFooter({ likeCount, commentCount, createdAt }: PostFooterProps) {
  return (
    <CardFooter className={'flex flex-row justify-between'}>
      <div className={'flex flex-row items-center'}>
        <div className={'flex flex-row'}>
          <p className={'font-bold pr-1'}>{likeCount}</p>
          <Heart className={'text-red-600'} />
        </div>
        <div className={'flex flex-row items-center pl-4'}>
          <p className={'font-bold pr-1 '}>{commentCount}</p>
          <Button variant={'link'} className={'text-foreground p-0 cursor-pointer'}>
            Comments
          </Button>
        </div>
      </div>
      <span className={'text-foreground/24 text-xs px-2'}>{format(createdAt, 'yyyy/MM/dd')}</span>
    </CardFooter>
  );
}

interface PostFooterProps {
  likeCount: number;
  commentCount: number;
  createdAt: Date;
}
