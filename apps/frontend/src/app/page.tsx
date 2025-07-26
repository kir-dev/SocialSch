'use client';
import PostCard from '@/components/PostCard';
import type { Post } from '@/types';
import usePosts from '@/hooks/use-posts';
import { SkeletonCard } from '@/components/SkeletonCard';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Home() {
  let { data: posts, isLoading } = usePosts();
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState<Post[]>([]);
  const [clicked, setClicked] = useState(false);

  if (!posts && !isLoading) return <h1>There are no visible posts. Come back later.</h1>;

  if (posts) {
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  function handleSubmit() {
    setClicked((prevState) => !prevState);
    if (clicked) {
      setFilter('');
      setFilteredData([]);
      return;
    }

    if (filter === '') {
      setFilteredData([]);
      return;
    }
    let searchedData = posts?.filter((post) => post.title.toLowerCase().includes(filter.toLowerCase()));

    if (searchedData && searchedData.length > 0) {
      setFilteredData(searchedData);
    }
  }

  return (
    <div className='bg-transparent w-full min-w-full flex flex-col items-center space-y-6 pt-10 pb-10'>
      <div className='bg-transparent flex w-3/5 min-w-3/5 items-center gap-2'>
        <Input
          type='text'
          placeholder='Search SocialSch'
          className='w-4/5'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <Button variant='outline' className='cursor-pointer' onClick={() => handleSubmit()}>
          {clicked ? 'Cancel' : 'Search'}
        </Button>
      </div>

      {isLoading && <SkeletonCard />}
      {filteredData.length === 0 && posts && (
        <div className='bg-transparent flex flex-col w-full items-center gap-4'>
          {posts.map((post: Post) => {
            return <PostCard key={post.postId} post={post} user={post.author} />;
          })}
        </div>
      )}
      {filteredData.length !== 0 && (
        <div className='bg-transparent flex flex-col w-full items-center gap-4'>
          {filteredData.map((post: Post) => {
            return <PostCard key={post.postId} post={post} user={post.author} />;
          })}
        </div>
      )}
    </div>
  );
}
