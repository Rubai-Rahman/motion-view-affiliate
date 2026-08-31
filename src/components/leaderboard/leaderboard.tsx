import { Trophy, DollarSign, Calendar, Medal, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LeaderboardData } from '@/types/dashboard.types';

interface LeaderboardProps {
  data: LeaderboardData;
}

const Leaderboard = ({ data }: LeaderboardProps) => {
  const { date_filter, my_position, leaderboard } = data;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="size-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="size-5 text-gray-400" />;
    if (rank === 3) return <Medal className="size-5 text-amber-600" />;
    return null;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    if (rank === 2) return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
    if (rank === 3) return 'bg-amber-600/10 text-amber-600 border-amber-600/20';
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Header with Date Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">
            Top performing affiliates this period
          </p>
        </div>
        {date_filter && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="size-4" />
            <span>
              {formatDate(date_filter.from_date)} -{' '}
              {formatDate(date_filter.to_date)}
            </span>
          </div>
        )}
      </div>

      {/* My Position Card */}
      <Card className="bg-linear-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="size-5 text-primary" />
            Your Position
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Rank</p>
              <div className="flex items-center gap-2">
                {getRankIcon(my_position.rank)}
                <p className="text-2xl font-bold">#{my_position.rank}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="text-2xl font-bold">{my_position.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Sales</p>
              <p className="text-2xl font-bold">
                ${my_position.total_sales.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Commission</p>
              <p className="text-2xl font-bold">
                ${my_position.total_commission.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">Affiliate Code:</span>
            <Badge variant="outline">{my_position.affiliate_code}</Badge>
            <span className="text-muted-foreground">Sales:</span>
            <span className="font-medium">{my_position.number_of_sales}</span>
            {my_position.is_in_top_10 && (
              <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                🏆 Top 10
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="size-5" />
            Leaderboard Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!leaderboard || leaderboard.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No leaderboard data available for this period.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((affiliate) => (
                <div
                  key={affiliate.affiliate_id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:bg-muted/50 ${
                    affiliate.affiliate_id === my_position.affiliate_id
                      ? 'bg-primary/5 border-primary/20'
                      : 'bg-card'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${getRankBadge(
                        affiliate.rank,
                      )}`}
                    >
                      {getRankIcon(affiliate.rank) || (
                        <span className="text-sm">#{affiliate.rank}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{affiliate.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {affiliate.affiliate_code}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        ${affiliate.total_sales.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {affiliate.number_of_sales} sales
                      </p>
                    </div>
                    <Badge
                      variant={
                        affiliate.rank <= 3 ? 'default' : 'secondary'
                      }
                    >
                      ${affiliate.total_commission.toLocaleString()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
