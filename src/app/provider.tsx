import { QueryProvider } from '@/components/provider/query-provider';
import SmoothScroll from '@/components/provider/smoothScroll';
import { ThemeProvider } from '@/components/provider/theme-provider';
import { Toaster } from '@/components/ui/toast';
import { TooltipProvider } from '@/components/ui/tooltip';

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <SmoothScroll>
            {children}
            <Toaster />
          </SmoothScroll>
        </TooltipProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
