import { DashboardSidebarContainer } from '@/components/navigation/dashboard-sidebar-container';
import { ThemeToggle } from '@/components/theme-toggle';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DashboardSidebarContainer />
      <main className="lg:pl-64">
        <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="lg:hidden">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
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
              </div>
            </div>
            <div className="flex-1 lg:ml-0">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Affiliate Dashboard
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
