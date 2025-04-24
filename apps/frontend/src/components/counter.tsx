'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold'>Counter: {count}</h1>
      <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded' onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
