import useSWR from 'swr';
import { User } from '@/types';
import { axiosGetFetcher } from '@/lib/fetchers';
import { AxiosError } from 'axios';

export default function useProfile(): {
  data: User | undefined;
  error: AxiosError;
  isLoading: boolean;
  mutate: () => Promise<User | undefined>;
} {
  return useSWR<User>('/auth/me', axiosGetFetcher, {
    shouldRetryOnError: false,
  });
}
