import { Home, Search, SquarePlus } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import NavUser from '@/components/nav-user';
import { CreatePostSheet } from '@/components/CreatePostSheet';
import useProfile from '@/hooks/use-profile';
import { useFollowersList, useFollowingList } from '@/hooks/use-follows';
import { useMemo, useState } from 'react';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Create',
    url: '/signup',
    icon: SquarePlus,
  },
];

export function AppSidebar() {
  const { data: me } = useProfile();
  const { users: followingUsers } = useFollowingList(me?.authSchId);
  const { users: followerUsers } = useFollowersList(me?.authSchId);
  const [openFollowing, setOpenFollowing] = useState(true);
  const [openFollowers, setOpenFollowers] = useState(false);

  const filteredFollowing = useMemo(
    () => (followingUsers ?? []).filter((u) => u.authSchId !== me?.authSchId),
    [followingUsers, me?.authSchId]
  );
  const filteredFollowers = useMemo(
    () => (followerUsers ?? []).filter((u) => u.authSchId !== me?.authSchId),
    [followerUsers, me?.authSchId]
  );

  return (
    <Sidebar variant='inset' collapsible='icon'>
      <SidebarContent>
        <SidebarGroup className='bg-sidebar'>
          <SidebarGroupLabel className='text-4xl pt-6 pb-10'>SocialSch</SidebarGroupLabel>
          <SidebarGroupContent />
          <SidebarGroupContent>
            <SidebarMenu className='space-y-1'>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.title === 'Create' && (
                    <SidebarMenuButton className='cursor-pointer'>
                      <CreatePostSheet triggerTitle={item.title} />
                    </SidebarMenuButton>
                  )}
                  {item.title !== 'Create' && (
                    <SidebarMenuButton asChild className='cursor-pointer'>
                      <a href={item.url}>
                        <item.icon size={32} />
                        <span className='text-[16px]'>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          {/* Following dropdown */}
          <SidebarGroupContent>
            <SidebarMenu className='space-y-1'>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className='cursor-pointer justify-between'
                  onClick={() => setOpenFollowing((o) => !o)}
                >
                  <span className='text-[16px]'>Following</span>
                  <span className='text-xs text-muted-foreground'>{filteredFollowing.length}</span>
                </SidebarMenuButton>
                {openFollowing && (
                  <div className='mt-1 pl-3'>
                    <SidebarMenu className='space-y-1'>
                      {filteredFollowing.map((u) => (
                        <SidebarMenuItem key={u.authSchId}>
                          <SidebarMenuButton asChild className='cursor-pointer'>
                            <a href={`/account?id=${u.authSchId}`}>
                              <span className='text-[14px]'>{u.username}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}

                      {filteredFollowing.length === 0 && (
                        <SidebarMenuItem>
                          <div className='px-2 py-1 text-sm text-muted-foreground'>No following</div>
                        </SidebarMenuItem>
                      )}
                    </SidebarMenu>
                  </div>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

          {/* Followers dropdown */}
          <SidebarGroupContent>
            <SidebarMenu className='space-y-1'>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className='cursor-pointer justify-between'
                  onClick={() => setOpenFollowers((o) => !o)}
                >
                  <span className='text-[16px]'>Followers</span>
                  <span className='text-xs text-muted-foreground'>{filteredFollowers.length}</span>
                </SidebarMenuButton>
                {openFollowers && (
                  <div className='mt-1 pl-3'>
                    <SidebarMenu className='space-y-1'>
                      {filteredFollowers.map((u) => (
                        <SidebarMenuItem key={u.authSchId}>
                          <SidebarMenuButton asChild className='cursor-pointer'>
                            <a href={`/users/${u.authSchId}`}>
                              <span className='text-[14px]'>{u.username}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                      {filteredFollowers.length === 0 && (
                        <SidebarMenuItem>
                          <div className='px-2 py-1 text-sm text-muted-foreground'>No followers</div>
                        </SidebarMenuItem>
                      )}
                    </SidebarMenu>
                  </div>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
