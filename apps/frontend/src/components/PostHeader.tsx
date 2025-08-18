import { CircleUserRound } from 'lucide-react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/types';
import useProfile from '@/hooks/use-profile';
import { useMyFollowingIds, followUser, unfollowUser } from '@/hooks/use-follows';
import { useState, useMemo } from 'react';

interface PostHeaderProps {
  user: User;
}

export default function PostHeader({ user }: Readonly<PostHeaderProps>) {
  const { data: me } = useProfile();
  const { ids: myFollowingIds } = useMyFollowingIds(Boolean(me));
  const isMe = me?.authSchId === user.authSchId;

  const isInitiallyFollowed = useMemo(
    () => (isMe ? false : myFollowingIds.includes(user.authSchId)),
    [isMe, myFollowingIds, user.authSchId]
  );

  const [optimisticFollowed, setOptimisticFollowed] = useState<boolean | null>(null);
  const followed = optimisticFollowed ?? isInitiallyFollowed;

  const toggleFollow = async () => {
    if (!me || isMe) return;
    const next = !followed;
    setOptimisticFollowed(next);
    try {
      if (next) {
        await followUser(user.authSchId);
      } else {
        await unfollowUser(user.authSchId);
      }
    } catch (e) {
      // revert on error
      setOptimisticFollowed(!next);
      console.error('Failed to update follow status:', e);
    }
  };

  return (
    <CardHeader className='flex flex-row justify-between items-center'>
      <div className='flex flex-row justify-start items-center'>
        <CircleUserRound size='32' />
        <div className='flex flex-col pl-1'>
          <CardTitle>{user.username}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </div>
      </div>
      {!isMe && (
        <Button
          variant='link'
          className={`p-2 ${followed ? 'text-muted-foreground pointer-events-auto' : ''}`}
          onClick={toggleFollow}
        >
          {followed ? 'Followed' : 'Follow'}
        </Button>
      )}
    </CardHeader>
  );
}
