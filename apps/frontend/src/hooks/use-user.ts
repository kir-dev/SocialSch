import useSWR from 'swr';
import { User } from '@/types';
import { axiosGetFetcher } from '@/lib/fetchers';
import { AxiosError } from 'axios';

export default function useProfile(id: string): {
  data: User | undefined;
  error: AxiosError;
  isLoading: boolean;
  mutate: () => Promise<User | undefined>;
} {
  return useSWR<User>(`users/${id}`, axiosGetFetcher);
}
