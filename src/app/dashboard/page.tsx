import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  Users,
  TrendingUp,
  Link2,
  Calendar,
  ArrowUpRight,
} from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Earnings',
      value: '$12,459.00',
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Total Clicks',
      value: '45,231',
      change: '+8.2%',
      icon: Link2,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Conversions',
      value: '1,234',
      change: '+15.3%',
      icon: Users,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Conversion Rate',
      value: '2.73%',
      change: '+0.4%',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'sale',
      description: 'New sale from user referral',
      amount: '$49.99',
      time: '2 hours ago',
      status: 'completed',
    },
    {
      id: 2,
      type: 'click',
      description: 'New click on affiliate link',
      amount: null,
      time: '4 hours ago',
      status: 'pending',
    },
    {
      id: 3,
      type: 'sale',
      description: 'Recurring commission payment',
      amount: '$29.99',
      time: '1 day ago',
      status: 'completed',
    },
    {
      id: 4,
      type: 'signup',
      description: 'New affiliate signup',
      amount: null,
      time: '2 days ago',
      status: 'completed',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome back, John! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with your affiliate account today.
          </p>
        </div>
        <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25">
          <Link2 className="mr-2 h-4 w-4" />
          Get Affiliate Link
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-linear-to-br ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </div>
              <div className="flex items-center mt-1">
                <Badge className={`${stat.bgColor} ${stat.textColor} border-0`}>
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {stat.change}
                </Badge>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Activity Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance Chart Placeholder */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                <p className="text-gray-600 dark:text-gray-400">
                  Performance chart coming soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        activity.type === 'sale'
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : activity.type === 'click'
                            ? 'bg-blue-100 dark:bg-blue-900/30'
                            : 'bg-purple-100 dark:bg-purple-900/30'
                      }`}
                    >
                      {activity.type === 'sale' ? (
                        <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : activity.type === 'click' ? (
                        <Link2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.amount && (
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                        {activity.amount}
                      </p>
                    )}
                    <Badge
                      variant={
                        activity.status === 'completed'
                          ? 'default'
                          : 'secondary'
                      }
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
            >
              <Link2 className="h-5 w-5" />
              <span>Generate Link</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500"
            >
              <TrendingUp className="h-5 w-5" />
              <span>View Reports</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500"
            >
              <DollarSign className="h-5 w-5" />
              <span>Request Payout</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
