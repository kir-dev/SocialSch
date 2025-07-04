import useSWR from 'swr';
import { User } from '@/types';
import { axiosGetFetcher } from '@/lib/fetchers';

export default function useProfile(id: string) {
  return useSWR<User>(`users/${id}`, axiosGetFetcher);
}
