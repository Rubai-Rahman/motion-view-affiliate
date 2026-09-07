import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Crown, Medal } from 'lucide-react';
import { LeaderboardEntry } from '@/types/leaderboard.types';

interface RankCardProps {
  order: number[];
  podium: Record<number, LeaderboardEntry>;
}

const RankCard = ({ order, podium }: RankCardProps) => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return <Crown className="size-5 text-yellow-500" />;
    }

    if (rank === 2) {
      return <Medal className="size-5 text-gray-400" />;
    }

    if (rank === 3) {
      return <Medal className="size-5 text-amber-600" />;
    }

    return null;
  };

  return (
    <div className="grid items-end gap-4 sm:grid-cols-3">
      {order.map((i) => {
        const p = podium[i];

        if (!p) return null;

        const isWinner = p.rank === 1;

        return (
          <Card
            key={p.affiliate_id}
            className={cn(
              'text-center transition-shadow',
              isWinner && 'border-primary shadow-lg',
            )}
          >
            <CardHeader className="items-center">
              <Avatar className="size-16">
                <AvatarImage src={p.profile_picture} alt={p.name} />

                <AvatarFallback>
                  {p.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <Badge
                variant={isWinner ? 'default' : 'secondary'}
                className="gap-1"
              >
                {getRankIcon(p.rank)}#{p.rank}
              </Badge>

              <div>
                <h3 className="font-semibold">{p.name}</h3>

                <p className="text-xs text-muted-foreground">
                  {p.affiliate_code}
                </p>
              </div>

              {p.is_me && <Badge variant="outline">You</Badge>}
            </CardHeader>

            <Separator />

            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">Total Commission</p>

              <p className="text-2xl font-bold">
                ৳{p.total_commission.toLocaleString()}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Sales</p>

                  <p className="font-semibold">
                    {p.number_of_sales.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Revenue</p>

                  <p className="font-semibold">
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
