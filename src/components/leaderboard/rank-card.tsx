import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Crown, Medal } from 'lucide-react';

import { LeaderboardEntry } from '@/types/leaderboard.types';

interface RankCardProps {
  order: number[];
  podium: Record<number, LeaderboardEntry>;
}

const RankCard = ({ order, podium }: RankCardProps) => {
  const getRankConfig = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          icon: Crown,
          label: '1st',
          accent: 'text-yellow-600',
          badge: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-700',
          avatar:
            'ring-2 ring-yellow-500/30 ring-offset-2 ring-offset-background',
          card: 'border-yellow-500/30 bg-linear-to-br from-yellow-500/[0.08] via-yellow-500/[0.02] to-transparent shadow-lg shadow-yellow-500/10',
          size: 'sm:col-span-1',
          height: 'h-auto',
          padding: 'p-5',
          avatarSize: 'size-14',
          commissionSize: 'text-2xl',
          offset: 'sm:translate-y-0',
        };

      case 2:
        return {
          icon: Medal,
          label: '2nd',
          accent: 'text-slate-500',
          badge: 'border-slate-400/30 bg-slate-400/10 text-slate-600',
          avatar:
            'ring-2 ring-slate-400/30 ring-offset-2 ring-offset-background',
          card: 'border-slate-400/25 bg-linear-to-br from-slate-400/[0.05] via-slate-400/[0.01] to-transparent shadow-md',
          size: 'sm:col-span-1',
          height: 'h-auto',
          padding: 'p-4',
          avatarSize: 'size-12',
          commissionSize: 'text-xl',
          offset: 'sm:translate-y-2',
        };

      case 3:
        return {
          icon: Medal,
          label: '3rd',
          accent: 'text-amber-700',
          badge: 'border-amber-600/30 bg-amber-600/10 text-amber-700',
          avatar:
            'ring-2 ring-amber-600/30 ring-offset-2 ring-offset-background',
          card: 'border-amber-600/25 bg-linear-to-br from-amber-600/[0.05] via-amber-600/[0.01] to-transparent shadow-md',
          size: 'sm:col-span-1',
          height: 'h-auto',
          padding: 'p-4',
          avatarSize: 'size-12',
          commissionSize: 'text-xl',
          offset: 'sm:translate-y-4',
        };

      default:
        return {
          icon: Medal,
          label: `#${rank}`,
          accent: 'text-muted-foreground',
          badge: 'border-border bg-muted text-muted-foreground',
          avatar: '',
          card: '',
          size: '',
          height: '',
          padding: '',
          avatarSize: 'size-12',
          commissionSize: 'text-xl',
          offset: '',
        };
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-3 items-end">
      {order.map((rank) => {
        const p = podium[rank];

        if (!p) return null;

        const config = getRankConfig(p.rank);
        const RankIcon = config.icon;

        return (
          <Card
            key={p.affiliate_id}
            className={cn(
              'relative overflow-hidden transition-all duration-200',
              'hover:-translate-y-1 hover:shadow-xl',
              config.card,
              config.size,
              config.height,
              config.padding,
              config.offset,
              p.is_me && 'ring-2 ring-primary/30',
            )}
          >
            {/* Rank accent */}
            <div
              className={cn(
                'absolute inset-x-0 top-0 h-1',
                p.rank === 1 &&
                  'bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-400',
                p.rank === 2 &&
                  'bg-linear-to-r from-slate-300 via-slate-400 to-slate-300',
                p.rank === 3 &&
                  'bg-linear-to-r from-amber-500 via-amber-600 to-amber-500',
              )}
            />

            {/* Background glow for rank 1 */}
            {p.rank === 1 && (
              <div className="absolute -top-10 -right-10 size-32 bg-yellow-500/10 rounded-full blur-2xl" />
            )}

            <CardContent className="relative">
              {/* Header */}
              <div className="flex items-center gap-3">
                <Avatar
                  className={cn(
                    'shrink-0 bg-muted',
                    config.avatarSize,
                    config.avatar,
                  )}
                >
                  <AvatarImage src={p.profile_picture} alt={p.name} />

                  <AvatarFallback className="text-sm font-semibold">
                    {p.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3
                      className={cn(
                        'truncate font-semibold',
                        p.rank === 1 ? 'text-base' : 'text-sm',
                      )}
                    >
                      {p.name}
                    </h3>

                    {p.is_me && (
                      <Badge
                        variant="secondary"
                        className="shrink-0 rounded-full px-1.5 py-0 text-[9px]"
                      >
                        You
                      </Badge>
                    )}
                  </div>

                  <p className="truncate text-[11px] text-muted-foreground">
                    {p.affiliate_code}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className={cn(
                    'shrink-0 gap-1 rounded-full px-2 py-0.5 text-[10px]',
                    config.badge,
                  )}
                >
                  <RankIcon className={cn('size-3', config.accent)} />
                  {config.label}
                </Badge>
              </div>

              {/* Commission */}
              <div className="mt-4">
                <p className="text-[11px] text-muted-foreground">
                  Total Commission
                </p>

                <p
                  className={cn(
                    'mt-0.5 font-bold tracking-tight',
                    config.commissionSize,
                    config.accent,
                  )}
                >
                  ৳ {p.total_commission.toLocaleString()}
                </p>
              </div>

              {/* Stats */}
              <div className="mt-3 grid grid-cols-2 border-t border-border/50 pt-3">
                <div>
                  <p className="text-[10px] text-muted-foreground">Sales</p>

                  <p className="mt-0.5 text-sm font-semibold">
                    {p.number_of_sales.toLocaleString()}
                  </p>
                </div>

                <div className="border-l border-border/50 pl-4">
                  <p className="text-[10px] text-muted-foreground">Revenue</p>

                  <p className="mt-0.5 text-sm font-semibold">
                    ৳ {p.total_sales.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default RankCard;
