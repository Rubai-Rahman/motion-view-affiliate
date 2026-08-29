import {
  BarChart3,
  LayoutDashboard,
  LifeBuoy,
  Link2,
  LogOut,
  ScrollText,
  Trophy,
  UserRound,
  Wallet,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarFooter,
} from '@/components/ui/sidebar';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

const primaryNav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/payments', label: 'Payments', icon: Wallet },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/affiliate-link', label: 'Affiliate Link', icon: Link2 },
] as const;

const secondaryNav = [
  { to: '/account', label: 'My Account', icon: UserRound },
  { to: '/help', label: 'Help & Support', icon: LifeBuoy },
  { to: '/terms', label: 'Terms & Conditions', icon: ScrollText },
] as const;

export function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className={`border-r border-border/50 bg-linear-to-b from-background to-muted/20 transition-all duration-300 ${
        open ? 'w-64' : 'w-16'
      }`}
    >
      <SidebarContent className="bg-linear-to-b from-background to-muted/20">
        {/* Primary Navigation */}
        <SidebarGroup>
          {open && (
            <SidebarGroupLabel className="px-4 py-6 text-lg font-bold text-transparent bg-clip-text bg-gradient-primary">
              MotionView
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {primaryNav.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.to}
                      className={`flex items-center gap-3 ${
                        open ? 'px-4' : 'justify-center px-2'
                      } rounded-lg py-3 transition-all duration-300 ${
                        pathname === item.to
                          ? 'bg-gradient-primary text-white shadow-elegant'
                          : 'text-foreground/80 hover:bg-muted/50 hover:text-foreground'
                      }`}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />

                      {open && (
                        <span className="font-medium">{item.label}</span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secondary Navigation */}
        <SidebarGroup className="mt-auto">
          {open && (
            <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase text-muted-foreground">
              General
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.to}
                      className={`flex items-center gap-3 ${
                        open ? 'px-4' : 'justify-center px-2'
                      } rounded-lg py-3 transition-all duration-300 ${
                        pathname === item.to
                          ? 'bg-gradient-primary text-white shadow-elegant'
                          : 'text-foreground/80 hover:bg-muted/50 hover:text-foreground'
                      }`}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />

                      {open && (
                        <span className="font-medium">{item.label}</span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout */}
      <SidebarFooter className="border-t border-border/50 bg-linear-to-b from-background to-muted/20 p-2">
        <Button
          variant="ghost"
          className={`w-full gap-3 text-destructive transition-all duration-300 hover:bg-destructive/10 hover:text-destructive ${
            !open ? 'justify-center px-2' : 'justify-start px-4'
          }`}
        >
          <LogOut className="h-5 w-5 shrink-0" />

          {open && <span className="font-medium">লগআউট</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
