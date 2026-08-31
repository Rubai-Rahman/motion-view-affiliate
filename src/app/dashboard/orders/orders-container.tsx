'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Orders from '@/components/orders/orders';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { TableSkeleton } from '@/components/skeleton/table-skeleton';
import { toast } from '@/components/ui/toast';
import { getOrderListData } from '@/serverAction/reportAction';
import { OrderFilters, OrderListApiResponse } from '@/types/orders.types';

const defaultFilters: OrderFilters = {
  from_date: '',
  to_date: '',
  status: 'all',
};

const OrdersContainer = () => {
  const [filters, setFilters] = useState<OrderFilters>(defaultFilters);

  const {
    data: ordersData,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['order-list', filters],
    queryFn: async () => {
      const result = await getOrderListData({
        from_date: filters.from_date,
        to_date: filters.to_date,
        status: filters.status,
      });

      if (!result.success) {
        toast.add({
          title: 'Orders Load Failed',
          description: result.error || 'Unable to load your order list.',
          type: 'error',
        });
      }

      return result;
    },
  });

  const handleFilterChange = (field: keyof OrderFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  if (isError) return <ErrorState />;
  if (isPending) return <TableSkeleton rows={8} columns={6} />;
  if (!ordersData?.data) return <EmptyState />;

  return (
    <Orders
      orders={ordersData.data as OrderListApiResponse}
      filters={filters}
      onFilterChange={handleFilterChange}
      onApplyFilters={refetch}
      isLoading={isPending}
    />
  );
};

export default OrdersContainer;
