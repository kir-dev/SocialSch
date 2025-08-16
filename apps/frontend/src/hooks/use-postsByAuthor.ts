'use client';
import useSWR from 'swr';
import { Post } from '@/types';
import { axiosGetFetcher } from '@/lib/fetchers';
import { AxiosError } from 'axios';

export default function usePostsByAuthor(id: string): {
  data: Post[] | undefined;
  error: AxiosError;
  isLoading: boolean;
  mutate: () => Promise<Post[] | undefined>;
} {
  const shouldFetch = id !== '' ? `posts/author/${id}` : null;

  return useSWR<Post[]>(shouldFetch, axiosGetFetcher, {
    shouldRetryOnError: false,
  });
}
