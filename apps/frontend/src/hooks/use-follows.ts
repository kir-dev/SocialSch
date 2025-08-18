import useSWR, { mutate } from 'swr';
import { axiosGetFetcher } from '@/lib/fetchers';
import api from '@/lib/axios';
import { FollowEdge, User } from '@/types';

export function useMyFollowingIds(enabled: boolean) {
  const { data, error, isLoading } = useSWR<string[]>(enabled ? '/follows/ids' : null, axiosGetFetcher, {
    shouldRetryOnError: false,
  });
  return { ids: data ?? [], isLoading, error };
}

export function useFollowingList(userId?: string) {
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

export function useFollowersList(userId?: string) {
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

/**
 * Optimista követés:
 * - azonnal hozzáadja a targetId-t az ids listához
 * - azonnal hozzáadja a target usert a /follows/following/:meId listához
 */
export async function followUserOptimistic(meId: string, target: Pick<User, 'authSchId' | 'username' | 'email'>) {
  const idsKey = '/follows/ids';
  const followingKey = `/follows/following/${meId}`;

  // Optimista frissítés az ids kulcsra
  mutate(
    idsKey,
    (curr: string[] | undefined) => {
      const set = new Set(curr ?? []);
      set.add(target.authSchId);
      return Array.from(set);
    },
    false
  );

  // Optimista frissítés a following listára
  mutate(
    followingKey,
    (curr: { following: typeof target }[] | undefined) => {
      const list = curr ?? [];
      const exists = list.some((r) => r.following?.authSchId === target.authSchId);
      if (exists) return list;
      return [{ following: target }, ...list];
    },
    false
  );

  try {
    await api.post(`/follows/${target.authSchId}`);
  } finally {
    // Revalidate, hogy konzisztens legyen
    await Promise.all([mutate(idsKey), mutate(followingKey)]);
  }
}

/**
 * Optimista kikövetés:
 * - azonnal eltávolítja a targetId-t az ids listából
 * - azonnal eltávolítja a target usert a /follows/following/:meId listából
 */
export async function unfollowUserOptimistic(meId: string, targetId: string) {
  const idsKey = '/follows/ids';
  const followingKey = `/follows/following/${meId}`;

  mutate(idsKey, (curr: string[] | undefined) => (curr ?? []).filter((id) => id !== targetId), false);

  mutate(
    followingKey,
    (curr: { following: Pick<User, 'authSchId' | 'username' | 'email'> }[] | undefined) =>
      (curr ?? []).filter((r) => r.following?.authSchId !== targetId),
    false
  );

  try {
    await api.delete(`/follows/${targetId}`);
  } finally {
    await Promise.all([mutate(idsKey), mutate(followingKey)]);
  }
}
