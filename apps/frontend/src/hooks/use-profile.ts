import useSWR from 'swr';
import { User } from '@/types';
import { axiosGetFetcher } from '@/lib/fetchers';

export default function useProfile(): {
  data: User | undefined;
  error: any;
  isLoading: boolean;
  mutate: () => Promise<User | undefined>;
} {
  return useSWR<User>('/auth/me', axiosGetFetcher, {
    shouldRetryOnError: false,
  });
}
