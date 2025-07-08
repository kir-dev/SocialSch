'use client';
import useSWR from 'swr';
import { Post } from '@/types';
import { axiosGetFetcher } from '@/lib/fetchers';
import { AxiosError } from 'axios';

export default function usePosts(): {
  data: Post[] | undefined;
  error: AxiosError;
  isLoading: boolean;
  mutate: () => Promise<Post[] | undefined>;
} {
  return useSWR<Post[]>('/posts/all', axiosGetFetcher, {
    shouldRetryOnError: false,
  });
}
