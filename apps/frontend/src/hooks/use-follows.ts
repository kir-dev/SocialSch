import useSWR, { mutate } from 'swr';
import { axiosGetFetcher } from '@/lib/fetchers';
import api from '@/lib/axios';
import { FollowEdge, User } from '@/types';

type UserIdentity = Pick<User, 'authSchId' | 'username' | 'email'>;

export function useMyFollowingIds(enabled: boolean): {
  ids: string[];
  isLoading: boolean;
  error: unknown;
} {
  const { data, error, isLoading } = useSWR<string[]>(enabled ? '/follows/ids' : null, axiosGetFetcher, {
    shouldRetryOnError: false,
  });
  return { ids: data ?? [], isLoading, error };
}

export function useFollowingList(userId?: string): {
  users: FollowEdge['following'][];
  isLoading: boolean;
  error: unknown;
} {
  const key = userId ? `/follows/following/${userId}` : null;
  const { data, error, isLoading } = useSWR<{ following: FollowEdge['following'] }[]>(key, axiosGetFetcher, {
    shouldRetryOnError: false,
  });
  return {
    users: (data ?? []).map((r) => r.following!).filter(Boolean),
    isLoading,
    error,
  };
}

export function useFollowersList(userId?: string): {
  users: FollowEdge['follower'][];
  isLoading: boolean;
  error: unknown;
} {
  const key = userId ? `/follows/followers/${userId}` : null;
  const { data, error, isLoading } = useSWR<{ follower: FollowEdge['follower'] }[]>(key, axiosGetFetcher, {
    shouldRetryOnError: false,
  });
  return {
    users: (data ?? []).map((r) => r.follower!).filter(Boolean),
    isLoading,
    error,
  };
}

export async function followUserOptimistic(meId: string, target: UserIdentity): Promise<void> {
  const idsKey = '/follows/ids';
  const followingKey = `/follows/following/${meId}`;
  const followersKey = `/follows/followers/${target.authSchId}`;

  await mutate(
    idsKey,
    (curr: string[] | undefined) => {
      const set = new Set(curr ?? []);
      set.add(target.authSchId);
      return Array.from(set);
    },
    false
  );

  await mutate(
    followingKey,
    (curr: { following: typeof target }[] | undefined) => {
      const list = curr ?? [];
      const exists = list.some((r) => r.following?.authSchId === target.authSchId);
      if (exists) return list;
      return [{ following: target }, ...list];
    },
    false
  );

  await mutate(
    followersKey,
    (curr: { follower: UserIdentity }[] | undefined) => {
      const meEdge = { follower: { authSchId: meId, username: 'You', email: '' } }; // a backend revalidáláskor pontosítja
      const list = curr ?? [];
      const exists = list.some((r) => r.follower?.authSchId === meId);
      return exists ? list : [meEdge, ...list];
    },
    false
  );

  try {
    await api.post(`/follows/${target.authSchId}`);
  } finally {
    await Promise.all([mutate(idsKey), mutate(followingKey), mutate(followersKey)]);
  }
}

export async function unfollowUserOptimistic(meId: string, targetId: string): Promise<void> {
  const idsKey = '/follows/ids';
  const followingKey = `/follows/following/${meId}`;
  const followersKey = `/follows/followers/${targetId}`;

  await mutate(idsKey, (curr: string[] | undefined) => (curr ?? []).filter((id) => id !== targetId), false);

  await mutate(
    followingKey,
    (curr: { following: UserIdentity }[] | undefined) =>
      (curr ?? []).filter((r) => r.following?.authSchId !== targetId),
    false
  );

  await mutate(
    followersKey,
    (curr: { follower: UserIdentity }[] | undefined) => (curr ?? []).filter((r) => r.follower?.authSchId !== meId),
    false
  );

  try {
    await api.delete(`/follows/${targetId}`);
  } finally {
    await Promise.all([mutate(idsKey), mutate(followingKey), mutate(followersKey)]);
  }
}
