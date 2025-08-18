import { CircleUserRound } from 'lucide-react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/types';
import useProfile from '@/hooks/use-profile';
import { useMyFollowingIds, followUserOptimistic, unfollowUserOptimistic } from '@/hooks/use-follows';
import { useState, useMemo } from 'react';

interface PostHeaderProps {
  user: User;
}

export default function PostHeader({ user }: Readonly<PostHeaderProps>) {
  const { data: me } = useProfile();
  const { ids: myFollowingIds, isLoading: idsLoading } = useMyFollowingIds(Boolean(me));
  const isMe = me?.authSchId === user.authSchId;

  const followed = useMemo(() => {
    if (!me || isMe) return false;
    return myFollowingIds.includes(user.authSchId);
  }, [me, isMe, myFollowingIds, user.authSchId]);

  const [submitting, setSubmitting] = useState(false);

  const toggleFollow = async () => {
    if (!me || isMe || submitting) return;
    setSubmitting(true);
    try {
      if (!followed) {
        await followUserOptimistic(me.authSchId, {
          authSchId: user.authSchId,
          username: user.username,
          email: user.email,
        });
      } else {
        await unfollowUserOptimistic(me.authSchId, user.authSchId);
      }
    } finally {
      setSubmitting(false);
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
      {!isMe && !idsLoading && (
        <Button
          variant='link'
          className={`p-2 ${followed ? 'text-muted-foreground' : ''}`}
          onClick={toggleFollow}
          disabled={submitting}
          aria-pressed={followed}
        >
          {followed ? 'Followed' : 'Follow'}
        </Button>
      )}
    </CardHeader>
  );
}
