export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className='bg-emerald-500'> Posts subpages</div>
      {children}
    </div>
  );
}
