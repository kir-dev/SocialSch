import useProfile from './use-profile';

export function useAuth() {
  const { data: user, error, isLoading } = useProfile();
  return { user, error, isLoading };
}
