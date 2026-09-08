import { Calendar } from 'lucide-react';
import { LeaderboardData, LeaderboardEntry } from '@/types/leaderboard.types';
import { DataTable } from '../ui/data-table/data-table';
import { createAppColumnHelper } from '../ui/data-table/data-table-features';
import RankCard from './rank-card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

export const dummyLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    affiliate_id: 1,
    name: 'John Doe',
    affiliate_code: 'ABC123',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 10,
    total_sales: 100,
    total_commission: 10,
    is_me: false,
  },
  {
    rank: 2,
    affiliate_id: 2,
    name: 'Jane Smith',
    affiliate_code: 'DEF456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 8,
    total_sales: 80,
    total_commission: 8,
    is_me: true,
  },
  {
    rank: 3,
    affiliate_id: 3,
    name: 'Bob Johnson',
    affiliate_code: 'GHI789',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 6,
    total_sales: 60,
    total_commission: 6,
    is_me: false,
  },
  {
    rank: 4,
    affiliate_id: 4,
    name: 'Alice Brown',
    affiliate_code: 'JKL012',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 5,
    total_sales: 50,
    total_commission: 5,
    is_me: false,
  },
  {
    rank: 5,
    affiliate_id: 5,
    name: 'Charlie Wilson',
    affiliate_code: 'MNO345',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 4,
    total_sales: 40,
    total_commission: 4,
    is_me: false,
  },
  {
    rank: 6,
    affiliate_id: 6,
    name: 'David Lee',
    affiliate_code: 'PQR678',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 3,
    total_sales: 30,
    total_commission: 3,
    is_me: false,
  },
  {
    rank: 7,
    affiliate_id: 7,
    name: 'Eva Davis',
    affiliate_code: 'STU901',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 2,
    total_sales: 20,
    total_commission: 2,
    is_me: false,
  },
  {
    rank: 8,
    affiliate_id: 8,
    name: 'Frank Miller',
    affiliate_code: 'VWX234',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 9,
    affiliate_id: 9,
    name: 'Grace Wilson',
    affiliate_code: 'YZA567',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 10,
    affiliate_id: 10,
    name: 'Henry Taylor',
    affiliate_code: 'BCD890',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 11,
    affiliate_id: 11,
    name: 'Ivy Anderson',
    affiliate_code: 'EFG123',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 12,
    affiliate_id: 12,
    name: 'Jack Thomas',
    affiliate_code: 'HIJ456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 13,
    affiliate_id: 13,
    name: 'Jack Thomas',
    affiliate_code: 'HIJ456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 14,
    affiliate_id: 14,
    name: 'Jack Thomas',
    affiliate_code: 'HIJ456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 15,
    affiliate_id: 15,
    name: 'Jack Thomas',
    affiliate_code: 'HIJ456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 16,
    affiliate_id: 16,
    name: 'Jack Thomas',
    affiliate_code: 'HIJ456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 17,
    affiliate_id: 17,
    name: 'Jack Thomas',
    affiliate_code: 'HIJ456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 18,
    affiliate_id: 18,
    name: 'Jack Thomas',
    affiliate_code: 'HIJ456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 19,
    affiliate_id: 19,
    name: 'Jack Thomas',
    affiliate_code: 'HIJ456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 20,
    affiliate_id: 20,
    name: 'Jack Thomas',
    affiliate_code: 'HIJ456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 21,
    affiliate_id: 21,
    name: 'Jack Thomas',
    affiliate_code: 'HIJ456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 22,
    affiliate_id: 22,
    name: 'Jack Thomas',
    affiliate_code: 'HIJ456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 23,
    affiliate_id: 23,
    name: 'Jack Thomas',
    affiliate_code: 'HIJ456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 24,
    affiliate_id: 24,
    name: 'Jack Thomas',
    affiliate_code: 'HIJ456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 25,
    affiliate_id: 25,
    name: 'Jack Thomas',
    affiliate_code: 'HIJ456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
  {
    rank: 26,
    affiliate_id: 26,
    name: 'Jack Thomas',
    affiliate_code: 'HIJ456',
    profile_picture: 'https://via.placeholder.com/50',
    number_of_sales: 1,
    total_sales: 10,
    total_commission: 1,
    is_me: false,
  },
];

interface LeaderboardProps {
  data: LeaderboardData;
}

const Leaderboard = ({ data }: LeaderboardProps) => {
  const { date_filter, my_position, leaderboard } = data;
  console.log('my_positions', leaderboard, my_position);
  const podium = dummyLeaderboardData.slice(0, 3);
  const order = [1, 0, 2];
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const columnHelper = createAppColumnHelper<LeaderboardEntry>();

  const columns = columnHelper.columns([
    columnHelper.accessor('rank', {
      header: 'Rank',
    }),

    columnHelper.accessor('name', {
      header: 'Affiliate',
      cell: ({ row }) => {
        const affiliate = row.original;

        return (
          <div
            className={cn(
              'flex items-center gap-3 rounded-lg py-1.5 pl-2',
              affiliate.is_me && 'border-l-4 border-primary bg-secondary/40',
            )}
          >
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
                <span className="font-medium">{affiliate.name}</span>

                {affiliate.is_me && (
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-primary/10 px-2 py-0 text-[10px] text-primary"
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
        );
      },
    }),

    columnHelper.accessor('number_of_sales', {
      header: 'Sales',
    }),

    columnHelper.accessor('total_sales', {
      header: 'Total Sales',
      cell: ({ getValue }) => {
        return <div>{getValue()}</div>;
      },
    }),

    columnHelper.accessor('total_commission', {
      header: 'Commission',
      cell: ({ getValue }) => {
        return <div>{getValue()}</div>;
      },
    }),
  ]);

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
      <div className="bg-muted rounded-md">
        <DataTable
          title="Leaderboard"
          data={dummyLeaderboardData}
          columns={columns}
          hasPagination={false}
        />
      </div>
      {my_position && my_position.rank > 15 && (
        <div className="overflow-hidden rounded-md border bg-card">
          {/* Your Position Header */}
          <div className="flex items-center gap-2 border-b bg-secondary/10 px-4 py-2">
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

          {/* Row */}
          <div className="grid grid-cols-[80px_minmax(250px,1fr)_120px_140px_140px] items-center">
            {/* Rank */}
            <div className="px-4 py-3">
              <span className="font-medium">{my_position.rank}</span>
            </div>

            {/* Affiliate */}
            <div className="px-4 py-3">
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
            </div>

            {/* Sales */}
            <div className="px-4 py-3 text-sm font-medium">
              {my_position.number_of_sales}
            </div>

            {/* Total Sales */}
            <div className="px-4 py-3 text-sm font-medium">
              {my_position.total_sales}
            </div>

            {/* Commission */}
            <div className="px-4 py-3 text-sm font-semibold">
              {my_position.total_commission}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
