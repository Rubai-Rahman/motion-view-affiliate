import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  TrendingUp,
  Users,
  Link2,
  Calendar,
  Download,
  Filter,
} from 'lucide-react';

export default function ReportsPage() {
  const performanceData = [
    {
      period: 'Jan 2024',
      clicks: 12345,
      conversions: 234,
      revenue: '$4,680.00',
      conversionRate: '1.9%',
    },
    {
      period: 'Feb 2024',
      clicks: 15678,
      conversions: 312,
      revenue: '$6,240.00',
      conversionRate: '2.0%',
    },
    {
      period: 'Mar 2024',
      clicks: 18234,
      conversions: 398,
      revenue: '$7,960.00',
      conversionRate: '2.2%',
    },
    {
      period: 'Apr 2024',
      clicks: 21456,
      conversions: 456,
      revenue: '$9,120.00',
      conversionRate: '2.1%',
    },
  ];

  const topPerformingLinks = [
    {
      name: 'Homepage Banner',
      clicks: 8543,
      conversions: 187,
      revenue: '$3,740.00',
      conversionRate: '2.2%',
    },
    {
      name: 'Product Page Widget',
      clicks: 6234,
      conversions: 145,
      revenue: '$2,900.00',
      conversionRate: '2.3%',
    },
    {
      name: 'Email Campaign',
      clicks: 4521,
      conversions: 98,
      revenue: '$1,960.00',
      conversionRate: '2.2%',
    },
    {
      name: 'Social Media Post',
      clicks: 3890,
      conversions: 76,
      revenue: '$1,520.00',
      conversionRate: '2.0%',
    },
  ];

  const geographicData = [
    {
      country: 'United States',
      clicks: 12456,
      revenue: '$12,456.00',
      percentage: '45%',
    },
    {
      country: 'United Kingdom',
      clicks: 5678,
      revenue: '$5,678.00',
      percentage: '20%',
    },
    {
      country: 'Canada',
      clicks: 3456,
      revenue: '$3,456.00',
      percentage: '12%',
    },
    {
      country: 'Germany',
      clicks: 2345,
      revenue: '$2,345.00',
      percentage: '8%',
    },
    {
      country: 'Australia',
      clicks: 1890,
      revenue: '$1,890.00',
      percentage: '7%',
    },
    { country: 'Others', clicks: 1890, revenue: '$1,890.00', percentage: '8%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-purple-500" />
            Performance Reports
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Detailed analytics and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-lg -linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Clicks
            </CardTitle>
            <div className="p-2 rounded-lg -linear-to-br from-blue-500 to-cyan-600">
              <Link2 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              67,713
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg -linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Conversions
            </CardTitle>
            <div className="p-2 rounded-lg -linear-to-br from-green-500 to-emerald-600">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              1,400
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg -linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Revenue
            </CardTitle>
            <div className="p-2 rounded-lg -linear-to-br from-purple-500 to-pink-600">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              $28,000
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +15.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg -linear-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Avg. Conversion Rate
            </CardTitle>
            <div className="p-2 rounded-lg -linear-to-br from-orange-500 to-red-600">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              2.1%
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +0.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different report types */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="links">Top Links</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Monthly Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Period
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Clicks
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Conversions
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Revenue
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Conversion Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.map((data, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100 font-medium">
                          {data.period}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {data.clicks.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {data.conversions}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100 font-semibold">
                          {data.revenue}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                            {data.conversionRate}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Top Performing Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full -linear-to-br from-blue-500 to-purple-600 text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                          {link.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {link.clicks.toLocaleString()} clicks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Conversions
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          {link.conversions}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Revenue
                        </p>
                        <p className="font-semibold text-green-600 dark:text-green-400">
                          {link.revenue}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                        {link.conversionRate}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Geographic Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicData.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {data.country}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {data.percentage}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {data.clicks.toLocaleString()} clicks
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {data.revenue}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full -linear-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: data.percentage }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Date Range Selector */}
      <Card className="border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Report Period
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  January 1, 2024 - April 30, 2024
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Change Date Range
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
