'use client';

import { ReactNode } from 'react';
import { Menu } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/navigation/app-sidebar';
import { ModeToggle } from '@/components/common/theme-toggle';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-linear-to-br from-background via-background to-muted/20">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 h-16 border-b border-border/50 bg-linear-to-br from-background/95 via-background/90 to-primary/5 backdrop-blur-xl shadow-lg shadow-primary/5">
            <div className="flex h-full items-center justify-between px-6">
              {/* Sidebar Toggle */}
              <SidebarTrigger className="rounded-lg p-2 transition-all duration-200 hover:bg-primary/10 hover:scale-105">
                <Menu className="size-5" />
              </SidebarTrigger>

              {/* Theme Toggle */}
              <ModeToggle />
            </div>
          </header>

          {/* Main */}
          <main className="flex-1 overflow-auto mx-4 pb-4 pt-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
