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
