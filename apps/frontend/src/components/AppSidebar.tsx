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
} from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/theme-provider';
import SideBarButton from '@/components/SideBarButton';

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
  {
    title: 'Profile',
    url: '/profile',
    icon: CircleUserRound,
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
              <SidebarMenuItem>
                <ModeToggle />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SideBarButton />
      </SidebarFooter>
    </Sidebar>
  );
}
