'use client';
import useSWR from 'swr';
import { axiosGetFetcher } from '@/lib/fetchers';

export default function useLikeCount(postId?: number) {
  const shouldFetch = typeof postId === 'number';
  return useSWR<number>(shouldFetch ? `/likes/count/${postId}` : null, axiosGetFetcher, {
    shouldRetryOnError: false,
  });
}
