'use client';
import { AxiosError } from 'axios';
import { Comment } from '@/types';
import useSWR from 'swr';
import { axiosGetFetcher } from '@/lib/fetchers';

export default function useComments(): {
  data: Comment[] | undefined;
  error: AxiosError;
  isLoading: boolean;
  mutate: () => Promise<Comment[] | undefined>;
} {
  return useSWR<Comment[]>(`/comments`, axiosGetFetcher, {
    shouldRetryOnError: false,
  });
}
