import useSWR from 'swr';
import { User } from '@/types';
import { axiosGetFetcher } from '@/lib/fetchers';

export default function useProfile(id: string): {
  data: User | undefined;
  error: any;
  isLoading: boolean;
  mutate: () => Promise<User | undefined>;
} {
  return useSWR<User>(`users/${id}`, axiosGetFetcher);
}
