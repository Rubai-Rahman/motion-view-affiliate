'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarLogo,
  SidebarNav,
  SidebarNavItem,
  SidebarOverlay,
} from './sidebar';
import {
  LayoutDashboard,
  Trophy,
  DollarSign,
  BarChart3,
  FileText,
  User,
  HelpCircle,
  Link as LinkIcon,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: Trophy },
  {
    name: 'Payment Report',
    href: '/dashboard/payment-report',
    icon: DollarSign,
  },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
  { name: 'Terms & Conditions', href: '/dashboard/terms', icon: FileText },
  { name: 'My Account', href: '/dashboard/account', icon: User },
  { name: 'Help & Support', href: '/dashboard/help', icon: HelpCircle },
  { name: 'Affiliate Link', href: '/dashboard/affiliate-link', icon: LinkIcon },
];

interface DashboardSidebarContainerProps {
  userName?: string;
  userEmail?: string;
  userInitials?: string;
  onLogout?: () => void;
}

export function DashboardSidebarContainer({
  userName = 'John Doe',
  userEmail = 'john@example.com',
  userInitials = 'JD',
  onLogout = () => console.log('Logout clicked'),
}: DashboardSidebarContainerProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleNavItemClick = () => {
    setMobileOpen(false);
  };

  const logoIcon = (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="bg-white dark:bg-gray-800 shadow-lg"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Overlay for mobile */}
      <SidebarOverlay
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <Sidebar state={mobileOpen ? 'open' : 'closed'}>
        <SidebarHeader>
          <SidebarLogo icon={logoIcon}>
            <h1 className="font-bold text-lg bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Motion View
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Affiliate Portal
            </p>
          </SidebarLogo>
        </SidebarHeader>

        <SidebarContent>
          <SidebarNav>
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} passHref legacyBehavior>
                  <SidebarNavItem
                    isActive={isActive}
                    onClick={handleNavItemClick}
                    href={item.href}
                  >
                    <item.icon
                      className={cn(
                        'h-5 w-5',
                        isActive ? 'text-blue-600 dark:text-blue-400' : '',
                      )}
                    />
                    {item.name}
                  </SidebarNavItem>
                </Link>
              );
            })}
          </SidebarNav>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {userName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {userEmail}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
