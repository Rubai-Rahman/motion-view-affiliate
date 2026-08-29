'use client';

import { ReactNode } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import { useTheme } from 'next-themes';
import { AppSidebar } from '@/components/navigation/app-sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-linear-to-br from-background via-background to-muted/20">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 h-16 border-b border-border/50 bg-background/80 backdrop-blur-lg">
            <div className="flex h-full items-center justify-between px-6">
              {/* Sidebar Toggle */}
              <SidebarTrigger className="rounded-lg p-2 transition-colors duration-200 hover:bg-muted/50">
                <Menu className="size-5" />
              </SidebarTrigger>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-muted/50"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )}
              </button>
            </div>
          </header>

          {/* Main */}
          <main className="flex-1 overflow-auto mx-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
