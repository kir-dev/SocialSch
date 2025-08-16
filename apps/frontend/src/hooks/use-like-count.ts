'use client';
import useSWR from 'swr';
import { axiosGetFetcher } from '@/lib/fetchers';
import { AxiosError } from 'axios'; // Add this import

export default function useLikeCount(postId?: number): {
  data: number | undefined;
  error: AxiosError;
  isLoading: boolean;
  mutate: () => Promise<number | undefined>;
} {
  const shouldFetch = typeof postId === 'number';
  return useSWR<number>(shouldFetch ? `/likes/count/${postId}` : null, axiosGetFetcher, {
    shouldRetryOnError: false,
  });
}
