import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

export default function LeaderboardPage() {
  const topAffiliates = [
    {
      rank: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      earnings: '$45,230.00',
      referrals: 342,
      conversionRate: '4.2%',
      avatar: 'SJ',
    },
    {
      rank: 2,
      name: 'Michael Chen',
      email: 'michael@example.com',
      earnings: '$38,450.00',
      referrals: 289,
      conversionRate: '3.8%',
      avatar: 'MC',
    },
    {
      rank: 3,
      name: 'Emily Davis',
      email: 'emily@example.com',
      earnings: '$32,890.00',
      referrals: 256,
      conversionRate: '3.5%',
      avatar: 'ED',
    },
    {
      rank: 4,
      name: 'James Wilson',
      email: 'james@example.com',
      earnings: '$28,340.00',
      referrals: 234,
      conversionRate: '3.2%',
      avatar: 'JW',
    },
    {
      rank: 5,
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      earnings: '$24,560.00',
      referrals: 198,
      conversionRate: '2.9%',
      avatar: 'LA',
    },
    {
      rank: 6,
      name: 'David Brown',
      email: 'david@example.com',
      earnings: '$21,890.00',
      referrals: 178,
      conversionRate: '2.7%',
      avatar: 'DB',
    },
    {
      rank: 7,
      name: 'Jennifer Taylor',
      email: 'jennifer@example.com',
      earnings: '$19,450.00',
      referrals: 156,
      conversionRate: '2.5%',
      avatar: 'JT',
    },
    {
      rank: 8,
      name: 'Robert Martinez',
      email: 'robert@example.com',
      earnings: '$17,230.00',
      referrals: 143,
      conversionRate: '2.3%',
      avatar: 'RM',
    },
  ];

  const yourRank = {
    rank: 12,
    name: 'John Doe',
    email: 'john@example.com',
    earnings: '$12,459.00',
    referrals: 89,
    conversionRate: '2.1%',
    avatar: 'JD',
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
    return (
      <span className="text-lg font-bold text-gray-600 dark:text-gray-400">
        #{rank}
      </span>
    );
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1)
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
    if (rank === 2)
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    if (rank === 3)
      return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" />
          Affiliate Leaderboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          See how you rank among top performing affiliates
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* 2nd Place */}
        <Card className="border-0 shadow-lg -linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 order-2 md:order-1">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full -linear-to-br from-gray-400 to-gray-500 mb-4 shadow-lg">
                <Medal className="h-8 w-8 text-white" />
              </div>
              <Avatar className="w-20 h-20 mx-auto mb-3 border-4 border-gray-300 dark:border-gray-600">
                <AvatarFallback className="-linear-to-br from-gray-400 to-gray-500 text-white text-xl">
                  {topAffiliates[1].avatar}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {topAffiliates[1].name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {topAffiliates[1].email}
              </p>
              <Badge className={getRankBadge(2)}>2nd Place</Badge>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Earnings
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {topAffiliates[1].earnings}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Referrals
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {topAffiliates[1].referrals}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 1st Place */}
        <Card className="border-0 shadow-2xl -linear-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/30 order-1 md:order-2">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full -linear-to-br from-yellow-400 to-amber-500 mb-4 shadow-xl">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <Avatar className="w-24 h-24 mx-auto mb-3 border-4 border-yellow-400">
                <AvatarFallback className="-linear-to-br from-yellow-400 to-amber-500 text-white text-2xl">
                  {topAffiliates[0].avatar}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">
                {topAffiliates[0].name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {topAffiliates[0].email}
              </p>
              <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
                🏆 1st Place
              </Badge>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Earnings
                  </span>
                  <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    {topAffiliates[0].earnings}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Referrals
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {topAffiliates[0].referrals}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3rd Place */}
        <Card className="border-0 shadow-lg -linear-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/30 order-3">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full -linear-to-br from-amber-600 to-orange-600 mb-4 shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <Avatar className="w-20 h-20 mx-auto mb-3 border-4 border-amber-600">
                <AvatarFallback className="-linear-to-br from-amber-600 to-orange-600 text-white text-xl">
                  {topAffiliates[2].avatar}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {topAffiliates[2].name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {topAffiliates[2].email}
              </p>
              <Badge className={getRankBadge(3)}>3rd Place</Badge>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Earnings
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {topAffiliates[2].earnings}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Referrals
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {topAffiliates[2].referrals}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your Position */}
      <Card className="border-2 border-blue-200 dark:border-blue-800 -linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full -linear-to-br from-blue-500 to-purple-600">
                <span className="text-white font-bold">#{yourRank.rank}</span>
              </div>
              <Avatar className="w-14 h-14">
                <AvatarFallback className="-linear-to-br from-blue-500 to-purple-600 text-white">
                  {yourRank.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">
                  {yourRank.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">You</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Earnings
                </p>
                <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
                  {yourRank.earnings}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Referrals
                </p>
                <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
                  {yourRank.referrals}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Conversion
                </p>
                <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
                  {yourRank.conversionRate}
                </p>
              </div>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">+3 positions</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Full Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topAffiliates.slice(3).map((affiliate) => (
              <div
                key={affiliate.rank}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700">
                    {getRankIcon(affiliate.rank)}
                  </div>
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="-linear-to-br from-blue-500 to-purple-600 text-white">
                      {affiliate.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {affiliate.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {affiliate.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-center hidden sm:block">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Earnings
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {affiliate.earnings}
                    </p>
                  </div>
                  <div className="text-center hidden sm:block">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Referrals
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {affiliate.referrals}
                    </p>
                  </div>
                  <div className="text-center hidden sm:block">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Rate
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {affiliate.conversionRate}
                    </p>
                  </div>
                  <Badge className={getRankBadge(affiliate.rank)}>
                    #{affiliate.rank}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
