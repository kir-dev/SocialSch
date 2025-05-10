import { Home, Inbox, Search, CircleUserRound } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/theme-provider';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '/signup',
    icon: Inbox,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Profile',
    url: '#',
    icon: CircleUserRound,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant='sidebar' collapsible='icon'>
      <SidebarContent>
        <SidebarGroup className='bg-sidebar'>
          <SidebarGroupLabel className='text-xl pt-6 pb-10'>SocialSch</SidebarGroupLabel>
          <SidebarGroupContent />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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
    </Sidebar>
  );
}
