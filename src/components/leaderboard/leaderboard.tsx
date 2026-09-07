import { Calendar } from 'lucide-react';
import { LeaderboardData, LeaderboardEntry } from '@/types/leaderboard.types';
import { DataTable } from '../ui/data-table/data-table';
import { createAppColumnHelper } from '../ui/data-table/data-table-features';
import RankCard from './rank-card';

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
  console.log('leaderboard', data);
  const { date_filter, my_position, leaderboard } = data;
  console.log('leaderboard', leaderboard, my_position);
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

  // const getRankBadge = (rank: number) => {
  //   if (rank === 1)
  //     return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
  //   if (rank === 2) return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
  //   if (rank === 3) return 'bg-amber-600/10 text-amber-600 border-amber-600/20';
  //   return '';
  // };
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
          <div className="flex items-center gap-3">
            <img
              src={affiliate.profile_picture}
              alt={affiliate.name}
              className="h-8 w-8 rounded-full object-cover"
            />

            <div>
              <div className="font-medium">
                {affiliate.name}

                {affiliate.is_me && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    You
                  </span>
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
      <DataTable
        title="Leaderboard"
        data={dummyLeaderboardData}
        columns={columns}
        hasPagination={false}
      />
    </div>
  );
};

export default Leaderboard;
