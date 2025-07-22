import { Home, Search, SquarePlus, CircleUserRound } from 'lucide-react';
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
  useSidebar,
} from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/theme-provider';
import useProfile from '@/hooks/use-profile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import NavUser from '@/components/nav-user';

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
  /*{
    title: 'Profile',
    url: '/profile',
    icon: CircleUserRound,
  },*/
];

const dropDownItems = [
  {
    title: 'Profile',
    url: '/profile',
  },
  {
    title: 'Sign out',
    url: '/auth/signout',
  },
];

export function AppSidebar() {
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
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon size={32} />
                      <span className='text-[16px]'>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/*<SidebarMenuItem>
                <ModeToggle />
              </SidebarMenuItem>*/}
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
