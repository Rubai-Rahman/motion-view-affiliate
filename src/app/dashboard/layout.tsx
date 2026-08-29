'use client';

import { AppSidebar } from '@/components/navigation/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-linear-to-br from-background via-background to-muted/20">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-lg">
            <div className="flex h-16 items-center justify-between px-6">
              <SidebarTrigger className="hover:bg-muted/50 transition-colors duration-300 rounded-lg p-2">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              {theme === 'dark' ? (
                <button onClick={toggleTheme}>
                  <Sun className="h-5 w-5" />
                </button>
              ) : (
                <button onClick={toggleTheme}>
                  <Moon className="h-5 w-5" />
                </button>
              )}
            </div>
          </header>
          <main className="flex-1 overflow-auto mx-4 ">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
