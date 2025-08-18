'use client';

import { useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

import useProfile from '@/hooks/use-profile';
import useUser from '@/hooks/use-user';
import usePosts from '@/hooks/use-posts';
import useComments from '@/hooks/use-comments';
import usePostsByAuthor from '@/hooks/use-postsByAuthor';
import useCommentsByAuthor from '@/hooks/use-commentsByAuthor';

import {
  useMyFollowingIds,
  useFollowersList,
  useFollowingList,
  followUserOptimistic,
  unfollowUserOptimistic,
} from '@/hooks/use-follows';

import AccountPosts from '@/components/accountPosts';
import AccountComments from '@/components/accountComments';

import type { Post, Comment, User } from '@/types';
import useSWR from 'swr';
import { axiosGetFetcher } from '@/lib/fetchers';

export default function AccountPage() {
  const searchParams = useSearchParams();
  const viewId = searchParams.get('id') || null;

  // Own profile
  const { data: me, isLoading: profileLoading } = useProfile();

  // Check if viewing own profile
  const isViewingMe = !viewId || viewId === me?.authSchId;

  // Global lists (for viewing own profile)
  const { data: allPosts } = usePosts();
  const { data: allComments } = useComments();

  // Other user's data (if not viewing myself)
  const { data: otherUser } = useUser(isViewingMe ? '' : viewId);
  const { data: postsByOther } = usePostsByAuthor(isViewingMe ? '' : viewId);
  const { data: commentsByOther } = useCommentsByAuthor(isViewingMe ? '' : viewId);

  // Displayed user
  const viewedUser: User | undefined = useMemo(() => {
    if (isViewingMe) return me;
    return otherUser;
  }, [isViewingMe, me, otherUser]);

  // Posts / comments for the displayed user
  const userPosts: Post[] = useMemo(() => {
    if (!viewedUser) return [];
    return isViewingMe ? (allPosts ?? []).filter((p) => p.authorId === viewedUser.authSchId) : (postsByOther ?? []);
  }, [isViewingMe, viewedUser, allPosts, postsByOther]);

  const userComments: Comment[] = useMemo(() => {
    if (!viewedUser) return [];
    return isViewingMe
      ? (allComments ?? []).filter((c) => c.authorId === viewedUser.authSchId)
      : (commentsByOther ?? []);
  }, [isViewingMe, viewedUser, allComments, commentsByOther]);

  // Total likes received by the displayed user
  const { data: totalLikes } = useSWR<number>(
    viewedUser ? `/likes/total/user/${viewedUser.authSchId}` : null,
    axiosGetFetcher,
    { shouldRetryOnError: false }
  );

  // Following/Followers lists
  const { users: followingUsers } = useFollowingList(viewedUser?.authSchId);
  const { users: followerUsers } = useFollowersList(viewedUser?.authSchId);
  const followingCount = followingUsers.length;
  const followersCount = followerUsers.length;

  const { ids: myFollowingIds, isLoading: followingIdsLoading } = useMyFollowingIds(Boolean(me));
  const isMe = !!viewedUser && me?.authSchId === viewedUser.authSchId;

  const followed = useMemo(() => {
    if (!viewedUser || isMe) return false;
    return myFollowingIds.includes(viewedUser.authSchId);
  }, [viewedUser, isMe, myFollowingIds]);

  const [submitting, setSubmitting] = useState(false);

  const toggleFollow = async () => {
    if (!me || !viewedUser || isMe || submitting) return;
    setSubmitting(true);
    try {
      if (!followed) {
        await followUserOptimistic(me.authSchId, {
          authSchId: viewedUser.authSchId,
          username: viewedUser.username,
          email: viewedUser.email,
        });
      } else {
        await unfollowUserOptimistic(me.authSchId, viewedUser.authSchId);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const [showComments, setShowComments] = useState(false);

  if (viewId && !viewedUser) {
    return <div className='min-w-full w-full flex justify-center pt-16'>Loading...</div>;
  }
  if (!viewId && profileLoading && !viewedUser) {
    return <div className='min-w-full w-full flex justify-center pt-16'>Loading...</div>;
  }

  if (!viewedUser) {
    return (
      <div className='min-w-full w-full flex justify-center pt-16 text-red-600 font-bold text-2xl'>
        Please log in to access this page
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <div className='bg-background min-h-screen flex flex-row justify-center items-start pt-16'>
        <div className='bg-background w-full max-w-4xl flex flex-col justify-center items-stretch px-4 md:px-0'>
          {/* Profile header card */}
          <div className='w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-xl border p-6'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-24 w-24 rounded-lg'>
                <AvatarFallback className='rounded-lg text-4xl font-bold'>
                  {viewedUser.username?.[0] ?? 'U'}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span className='text-2xl md:text-3xl font-semibold'>{viewedUser.username}</span>
                <span className='text-muted-foreground'>{viewedUser.email}</span>

                <div className='mt-4 grid grid-cols-3 gap-4 text-sm md:text-base'>
                  <div>
                    <span className='font-semibold'>{userPosts.length}</span> posts
                  </div>
                  <div>
                    <span className='font-semibold'>{totalLikes ?? 0}</span> likes
                  </div>
                  <div className='flex gap-4'>
                    <span title='Following'>
                      <span className='font-semibold'>{followingCount}</span> following
                    </span>
                    <span title='Followers'>
                      <span className='font-semibold'>{followersCount}</span> followers
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {!isMe && !followingIdsLoading && (
              <Button
                variant={followed ? 'outline' : 'default'}
                className={followed ? 'text-muted-foreground' : ''}
                onClick={toggleFollow}
                disabled={submitting}
                aria-pressed={followed}
              >
                {followed ? 'Followed' : 'Follow'}
              </Button>
            )}
          </div>

          {/* Tabs */}
          <div className='mt-10'>
            <div className='flex h-5 items-center space-x-4 text-sm mb-6'>
              <button
                className={`text-lg cursor-pointer bg-transparent border-none p-0 ${!showComments ? 'underline' : 'hover:underline'}`}
                onClick={() => setShowComments(false)}
                onKeyDown={(e) => e.key === 'Enter' && setShowComments(false)}
              >
                Posts
              </button>
              <Separator orientation='vertical' />
              <button
                className={`text-lg cursor-pointer bg-transparent border-none p-0 ${showComments ? 'underline' : 'hover:underline'}`}
                onClick={() => setShowComments((s) => !s)}
                onKeyDown={(e) => e.key === 'Enter' && setShowComments((s) => !s)}
              >
                Comments
              </button>
            </div>

            {showComments ? (
              <div className='min-w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                <AccountComments userComments={userComments} />
              </div>
            ) : (
              <div className='min-w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                <AccountPosts userPosts={userPosts} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
