import { Calendar } from 'lucide-react';
import { LeaderboardData } from '@/types/leaderboard.types';
import RankCard from './rank-card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '../ui/table';
import { EmptyState } from '../shared/empty-state';

interface LeaderboardProps {
  data: LeaderboardData;
}

const Leaderboard = ({ data }: LeaderboardProps) => {
  console.log('leaderBoardData', data);
  const { date_filter, my_position, leaderboard } = data;
  console.log('my_positions', leaderboard, my_position);
  const podium = leaderboard.slice(0, 3);
  const order = [1, 0, 2];
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
      <RankCard order={order} podium={podium} />
      {leaderboard.length === 0 ? (
        <div className="rounded-xl border border-border/50 bg-linear-to-br from-background via-background to-muted/20 backdrop-blur-sm shadow-lg shadow-primary/5 overflow-hidden">
          <EmptyState />
        </div>
      ) : (
        <>
          {/* Regular Table */}
          <div className="rounded-xl border border-border/50 bg-linear-to-br from-background via-background to-muted/20 backdrop-blur-sm shadow-lg shadow-primary/5 overflow-hidden">
            <div className="border-b border-border/50 bg-muted/30 px-6 py-4">
              <h3 className="font-semibold">Leaderboard Rankings</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Affiliate</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Total Sales</TableHead>
                  <TableHead>Commission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((affiliate) => (
                  <TableRow
                    key={affiliate.affiliate_id}
                    className={cn(
                      affiliate.is_me && 'bg-primary/10! hover:bg-primary/15!',
                    )}
                  >
                    <TableCell>
                      <span className="font-semibold">{affiliate.rank}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarImage
                            src={affiliate.profile_picture}
                            alt={affiliate.name}
                          />
                          <AvatarFallback>
                            {affiliate.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {affiliate.name}
                            </span>
                            {affiliate.is_me && (
                              <Badge
                                variant="secondary"
                                className="rounded-full bg-primary/20 px-2 py-0 text-[10px] text-primary"
                              >
                                You
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {affiliate.affiliate_code}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {affiliate.number_of_sales}
                    </TableCell>
                    <TableCell className="font-medium">
                      ৳ {affiliate.total_sales.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ৳ {affiliate.total_commission.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
      {my_position && my_position.rank > 15 && (
        <div className="rounded-xl border border-border/50 bg-linear-to-br from-background via-background to-muted/20 backdrop-blur-sm shadow-lg shadow-primary/5 overflow-hidden">
          <div className="border-b border-border/50 bg-secondary/10 px-6 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Your Position
              </span>

              <Badge
                variant="secondary"
                className="rounded-full bg-secondary/15 px-2 py-0.5 text-[10px]"
              >
                #{my_position.rank}
              </Badge>
            </div>
          </div>

          <Table>
            <TableBody>
              <TableRow className="bg-primary/10!">
                <TableCell>
                  <span className="font-semibold">{my_position.rank}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarFallback className="bg-secondary/15 text-sm font-semibold">
                        {my_position.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-semibold">
                          {my_position.name}
                        </span>

                        <Badge
                          variant="secondary"
                          className="shrink-0 rounded-full bg-secondary/15 px-2 py-0 text-[10px]"
                        >
                          You
                        </Badge>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {my_position.affiliate_code}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {my_position.number_of_sales}
                </TableCell>
                <TableCell className="font-medium">
                  ৳ {my_position.total_sales.toLocaleString()}
                </TableCell>
                <TableCell className="font-semibold">
                  ৳ {my_position.total_commission.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
