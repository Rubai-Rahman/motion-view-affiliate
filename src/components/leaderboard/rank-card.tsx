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
          card: 'border-yellow-500/30 bg-yellow-500/[0.02]',
        };

      case 2:
        return {
          icon: Medal,
          label: '2nd',
          accent: 'text-slate-500',
          badge: 'border-slate-400/30 bg-slate-400/10 text-slate-600',
          avatar:
            'ring-2 ring-slate-400/30 ring-offset-2 ring-offset-background',
          card: 'border-slate-400/25 bg-slate-400/[0.02]',
        };

      case 3:
        return {
          icon: Medal,
          label: '3rd',
          accent: 'text-amber-700',
          badge: 'border-amber-600/30 bg-amber-600/10 text-amber-700',
          avatar:
            'ring-2 ring-amber-600/30 ring-offset-2 ring-offset-background',
          card: 'border-amber-600/25 bg-amber-600/[0.02]',
        };

      default:
        return {
          icon: Medal,
          label: `#${rank}`,
          accent: 'text-muted-foreground',
          badge: 'border-border bg-muted text-muted-foreground',
          avatar: '',
          card: '',
        };
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-3">
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
              'hover:-translate-y-0.5 hover:shadow-md',
              config.card,
              p.is_me && 'ring-1 ring-primary/20',
            )}
          >
            {/* Rank accent */}
            <div
              className={cn(
                'absolute inset-x-0 top-0 h-0.5',
                p.rank === 1 && 'bg-yellow-500',
                p.rank === 2 && 'bg-slate-400',
                p.rank === 3 && 'bg-amber-600',
              )}
            />

            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-center gap-3">
                <Avatar
                  className={cn('size-12 shrink-0 bg-muted', config.avatar)}
                >
                  <AvatarImage src={p.profile_picture} alt={p.name} />

                  <AvatarFallback className="text-sm font-semibold">
                    {p.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="truncate text-sm font-semibold">{p.name}</h3>

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
                    'mt-0.5 text-xl font-bold tracking-tight',
                    config.accent,
                  )}
                >
                  ৳{p.total_commission.toLocaleString()}
                </p>
              </div>

              {/* Stats */}
              <div className="mt-3 grid grid-cols-2 border-t pt-3">
                <div>
                  <p className="text-[10px] text-muted-foreground">Sales</p>

                  <p className="mt-0.5 text-sm font-semibold">
                    {p.number_of_sales.toLocaleString()}
                  </p>
                </div>

                <div className="border-l pl-4">
                  <p className="text-[10px] text-muted-foreground">Revenue</p>

                  <p className="mt-0.5 text-sm font-semibold">
                    ৳{p.total_sales.toLocaleString()}
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
