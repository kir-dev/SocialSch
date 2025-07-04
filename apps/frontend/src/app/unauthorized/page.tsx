import LoginButton from '@/components/login-button';

export default function UnauthorizedPage() {
  return (
    <div className='flex flex-col items-center w-full'>
      <h1>Az oldal megtekintéséhez bejelentkezés szükséges</h1>
      <LoginButton />
    </div>
  );
}
