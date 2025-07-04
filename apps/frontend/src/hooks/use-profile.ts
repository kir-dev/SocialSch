import useSWR from 'swr';
import { User } from '@/types';
import { axiosGetFetcher } from '@/lib/fetchers';

export default function useProfile() {
  return useSWR<User>('/auth/me', axiosGetFetcher, {
    shouldRetryOnError: false,
  });
}
