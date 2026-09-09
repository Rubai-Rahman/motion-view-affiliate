'use client';

import {
  LayoutDashboard,
  Trophy,
  Wallet,
  BarChart3,
  Package,
  UserRound,
  LifeBuoy,
  ScrollText,
  LogOut,
  Link2,
} from 'lucide-react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

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

import { Button } from '@/components/ui/button';
import { logoutAction } from '@/serverAction/authAction';
import useLocalStorage from '@/hooks/useSyncExterna';
import { cn } from '@/lib/utils';

const primaryNav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/dashboard/payment-report', label: 'Payments', icon: Wallet },
  { href: '/dashboard/reports', label: 'Reports', icon: BarChart3 },

  { href: '/dashboard/orders', label: 'Orders', icon: Package },
  { href: '/dashboard/affiliate-link', label: 'Affiliate Link', icon: Link2 },
] as const;

const secondaryNav = [
  { href: '/dashboard/account', label: 'My Account', icon: UserRound },
  { href: '/dashboard/help', label: 'Help & Support', icon: LifeBuoy },
  { href: '/dashboard/terms', label: 'Terms & Conditions', icon: ScrollText },
] as const;

function NavItem({
  item,
}: {
  item: (typeof primaryNav)[number] | (typeof secondaryNav)[number];
}) {
  const pathname = usePathname();

  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={item.label}
        isActive={isActive}
        className="h-10"
        render={
          <Link
            href={item.href}
            className={cn(
              'flex items-center gap-2 group-data-[collapsible=icon]:justify-center rounded-lg transition-all duration-200',
              isActive
                ? 'bg-linear-to-r from-primary/20 to-primary/5 border border-primary/30 text-primary shadow-sm shadow-primary/10'
                : 'hover:bg-primary/10 hover:border-primary/20 border border-transparent',
            )}
          >
            <Icon
              className={cn(
                'size-4 shrink-0 transition-colors',
                isActive
                  ? 'text-secondary'
                  : 'text-muted-foreground group-hover:text-foreground',
              )}
            />
            <span className="text-sm font-medium group-data-[collapsible=icon]:hidden">
              {item.label}
            </span>
          </Link>
        }
      />
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  const router = useRouter();
  const name = useLocalStorage('name');

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('phone');
      localStorage.removeItem('name');
      localStorage.removeItem('affiliateCode');
    }
    await logoutAction();
    router.push('/login');
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border border-border/50 bg-linear-to-br from-sidebar via-sidebar to-primary/5"
    >
      <SidebarContent className="bg-transparent">
        {/* Logo */}
        <div className="px-4 py-6">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-linear-to-br from-primary to-primary/60 shadow-lg shadow-primary/20">
              <span className="size-3 rotate-45 bg-primary-foreground" />
            </span>

            <span className="text-sm font-semibold tracking-tight text-foreground group-data-[collapsible=icon]:hidden">
              Motion View
              <span className="ml-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Affiliates
              </span>
            </span>
          </div>
        </div>

        {/* Performance */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 pb-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80 font-semibold">
            Performance
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {primaryNav.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="px-6 pb-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80 font-semibold">
            Account
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {secondaryNav.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User + Logout */}
      <SidebarFooter className="border-t border-border/50 p-2 bg-linear-to-t from-primary/5 to-transparent">
        <div className="space-y-2">
          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-linear-to-br from-primary/10 to-transparent p-3 group-data-[collapsible=icon]:justify-center shadow-sm">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-primary/60 font-mono text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20">
              MV
            </span>

            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-xs font-semibold text-foreground">
                {name}
              </p>

              <p className="truncate font-mono text-[10px] text-muted-foreground">
                Affiliate
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-3 text-destructive hover:bg-destructive/10 hover:text-destructive group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 transition-all duration-200"
            onClick={() => handleLogout()}
          >
            <LogOut className="size-4" />
            <span className="group-data-[collapsible=icon]:hidden">লগআউট</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
