import { HelloWorld } from '@/components/hello-world';
import { Counter } from '@/components/counter';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen'>
      <HelloWorld className='mt-10' />
      <Counter />
    </main>
  );
}
