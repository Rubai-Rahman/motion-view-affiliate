'use client';

import {
  LayoutDashboard,
  Trophy,
  Wallet,
  BarChart3,
  Link2,
  UserRound,
  LifeBuoy,
  ScrollText,
  LogOut,
} from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

const primaryNav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/dashboard/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/dashboard/payment-report', label: 'Payments', icon: Wallet },
  { to: '/dashboard/reports', label: 'Reports', icon: BarChart3 },
  { to: '/dashboard/affiliate-link', label: 'Affiliate Link', icon: Link2 },
] as const;

const secondaryNav = [
  { to: '/dashboard/account', label: 'My Account', icon: UserRound },
  { to: '/dashboard/help', label: 'Help & Support', icon: LifeBuoy },
  { to: '/dashboard/terms', label: 'Terms & Conditions', icon: ScrollText },
] as const;

function NavItem({
  item,
}: {
  item: (typeof primaryNav)[number] | (typeof secondaryNav)[number];
}) {
  const pathname = usePathname();

  const isActive = pathname === item.to;
  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={item.label}
        isActive={isActive}
        className="h-10"
        render={
          <Link
            href={item.to}
            className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center"
          >
            <Icon className="size-4 shrink-0" />
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
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-sidebar">
      <SidebarContent className="bg-sidebar">
        {/* Logo */}
        <div className="px-4 py-6">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-brand">
              <span className="size-3 rotate-45 bg-brand-foreground" />
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
          <SidebarGroupLabel className="px-6 pb-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Performance
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {primaryNav.map((item) => (
                <NavItem key={item.to} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="px-6 pb-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Account
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {secondaryNav.map((item) => (
                <NavItem key={item.to} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User + Logout */}
      <SidebarFooter className="border-t border-border p-2">
        <div className="space-y-2">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-3 group-data-[collapsible=icon]:justify-center">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/15 font-mono text-xs font-semibold text-brand">
              MV
            </span>

            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-xs font-semibold text-foreground">
                Motion View
              </p>

              <p className="truncate font-mono text-[10px] text-muted-foreground">
                Affiliate
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-3 text-destructive hover:bg-destructive/10 hover:text-destructive group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
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
