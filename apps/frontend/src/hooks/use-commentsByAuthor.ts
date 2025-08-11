'use client';
import useSWR from 'swr';
import { Comment } from '@/types';
import { axiosGetFetcher } from '@/lib/fetchers';
import { AxiosError } from 'axios';

export default function useCommentsByAuthor(id: string): {
  data: Comment[] | undefined;
  error: AxiosError;
  isLoading: boolean;
  mutate: () => Promise<Comment[] | undefined>;
} {
  const shouldFetch = id !== '' ? `comments/author/${id}` : null;

  return useSWR<Comment[]>(shouldFetch, axiosGetFetcher, {
    shouldRetryOnError: false,
  });
}
