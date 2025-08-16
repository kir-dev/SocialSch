import useProfile from './use-profile';

export function useAuth(): { user: unknown; error: unknown; isLoading: boolean } {
  const { data: user, error, isLoading } = useProfile();
  return { user, error, isLoading };
}
