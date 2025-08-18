import useSWR, { mutate } from 'swr';
import { axiosGetFetcher } from '@/lib/fetchers';
import api from '@/lib/axios';
import { FollowEdge } from '@/types';

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

export async function followUser(targetId: string) {
  await api.post(`/follows/${targetId}`);
  await mutate('/follows/ids');
}

export async function unfollowUser(targetId: string) {
  await api.delete(`/follows/${targetId}`);
  await mutate('/follows/ids');
}
