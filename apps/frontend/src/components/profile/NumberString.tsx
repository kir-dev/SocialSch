interface NumberStringProps {
  value: number;
  name: string;
}

export default function NumberString({ value, name }: NumberStringProps) {
  return (
    <div className='flex flex-col items-center space-y-0.25'>
      <h2 className='font-bold text-2xl'>{value}</h2>
      <h1 className='text-2xl'>{name}</h1>
    </div>
  );
}
