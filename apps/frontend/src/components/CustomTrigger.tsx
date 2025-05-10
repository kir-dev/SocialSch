'use client';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as React from 'react';

export function CustomTrigger() {
  const { open, toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar='trigger'
      data-slot='sidebar-trigger'
      variant='ghost'
      size='icon'
      className={cn('size-7')}
      onClick={() => {
        toggleSidebar();
      }}
    >
      {open ? <ChevronLeft /> : <ChevronRight />}
      <span className='sr-only'>Toggle Sidebar</span>
    </Button>
  );
}
