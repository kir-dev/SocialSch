import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function PostHeader() {
  return (
    <>
      <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  );
}

export default PostHeader;
