import useProfile from './use-profile';
import { User } from '@/types';

export function useAuth(): {
  user: User | undefined;
  error: unknown;
  isLoading: boolean;
} {
  const { data: user, error, isLoading } = useProfile();
  return { user, error, isLoading };
}
