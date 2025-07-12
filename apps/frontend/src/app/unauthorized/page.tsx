import LoginButton from '@/components/login-button';

export default function UnauthorizedPage() {
  return (
    <div className='min-w-screen flex flex-col items-center justify-center space-y-6 pt-10 pb-10 sm:pr-32'>
      <h1 className='text-red-600 '>A végrehajtáshoz bejelentkezés szükséges</h1>
      <LoginButton />
    </div>
  );
}
