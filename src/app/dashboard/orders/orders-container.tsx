'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getOrderListData } from '@/serverAction/orderListAction';
import ListFilter from '@/components/common/list-filter';
import { orderTypeOptions } from '@/constants/filter.constant';
import OrderList from '@/components/orders/order-list';
import { InboxIcon } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import TableSkeleton from '@/components/skeleton/table-skeleton';
import { ErrorState } from '@/components/shared/error-state';

const OrdersContainer = () => {
  const [filters, setFilters] = useState<{
    from_date: string;
    to_date: string;
    status: number | null;
  }>({
    from_date: '',
    to_date: '',
    status: null,
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: orderListData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['order-list', filters, pagination],
    queryFn: () =>
      getOrderListData({
        from_date: filters.from_date,
        to_date: filters.to_date,
        status: filters.status,
        per_page: pagination.pageSize,
        page: pagination.pageIndex + 1,
      }),
  });

  const handleFiltersChange = (newFilters: {
    from_date: string;
    to_date: string;
    status?: number | null;
  }) => {
    setFilters({
      from_date: newFilters.from_date,
      to_date: newFilters.to_date,
      status: newFilters.status ?? null,
    });
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  };

  const handleResetFilters = () => {
    setFilters({
      from_date: '',
      to_date: '',
      status: null,
    });
    setPagination({ pageIndex: 0, pageSize: 10 });
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-primary/10 opacity-50 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Order List
            </h1>
            <p className="text-sm text-muted-foreground">
              Track your order history and manage your orders
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <ListFilter
          title={'OrderList'}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onReset={handleResetFilters}
          options={orderTypeOptions}
        />
        {isPending ? (
          <TableSkeleton />
        ) : isError ? (
          <ErrorState />
        ) : orderListData?.data === null ||
          orderListData?.data?.data?.length === 0 ||
          orderListData?.data === undefined ? (
          <EmptyState
            title="No orders found"
            description="Try adjusting your filters or search query."
            icon={<InboxIcon className="size-10 text-muted-foreground" />}
          />
        ) : (
          <OrderList
            orderListData={orderListData?.data}
            pagination={pagination}
            onPaginationChange={setPagination}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersContainer;
