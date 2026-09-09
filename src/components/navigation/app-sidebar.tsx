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
import Image from 'next/image';

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
                ? 'bg-linear-to-r from-secondary/20 to-secondary/5 border border-secondary/30 text-secondary shadow-sm shadow-secondary/10'
                : 'hover:bg-secondary/10 hover:border-secondary/20 border border-transparent',
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
  const profilePicture = useLocalStorage('profilePicture');
  console.log('profilePicture', profilePicture);
  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('phone');
      localStorage.removeItem('name');
      localStorage.removeItem('affiliateCode');
      localStorage.removeItem('profilePicture');
    }
    await logoutAction();
    router.push('/login');
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border border-border/50 bg-linear-to-br from-sidebar via-sidebar to-secondary/5"
    >
      <SidebarContent className="bg-sidebar">
        {/* Logo */}
        <div className="px-4 py-6">
          <div className="flex items-center gap-2.5 ">
            <Image src="/images/logo.webp" alt="Logo" width={140} height={40} />
          </div>
        </div>

        {/* Performance */}
        <SidebarGroup className="">
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
      <SidebarFooter className="border-t border-border/50 p-2 bg-linear-to-t from-secondary/5 to-transparent">
        <div className="space-y-2">
          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-linear-to-br from-secondary/10 to-transparent p-3 group-data-[collapsible=icon]:justify-center shadow-sm">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-secondary to-secondary/60 font-mono text-xs font-semibold text-secondary-foreground shadow-md shadow-secondary/20">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${profilePicture}`}
                alt="Logo"
                width={36}
                height={36}
                className="rounded-full"
              />
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
