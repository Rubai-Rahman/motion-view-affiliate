import { DataTable } from '@/components/ui/data-table/data-table';
import { createAppColumnHelper } from '@/components/ui/data-table/data-table-features';
import { OrderItem, OrderListApiResponse } from '@/types/orders.types';

const columnHelper = createAppColumnHelper<OrderItem>();

const columns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'ID',
  }),

  columnHelper.accessor('order_no', {
    header: 'Order No',
    cell: ({ getValue }) => getValue() || '-',
  }),

  columnHelper.accessor('coupon_code', {
    header: 'Coupon Code',
    cell: ({ getValue }) => getValue() || '-',
  }),

  columnHelper.accessor('order_subtotal', {
    header: 'Order Subtotal',
    cell: ({ getValue }) => {
      const value = getValue();

      return value
        ? `৳ ${Number(value).toLocaleString('en-BD', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : '-';
    },
  }),

  columnHelper.accessor('discount_amount', {
    header: 'Discount',
    cell: ({ getValue }) => {
      const value = getValue();

      return value
        ? `৳ ${Number(value).toLocaleString('en-BD', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : '-';
    },
  }),

  columnHelper.accessor('eligible_amount', {
    header: 'Eligible Amount',
    cell: ({ getValue }) => {
      const value = getValue();

      return value
        ? `৳ ${Number(value).toLocaleString('en-BD', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : '-';
    },
  }),

  columnHelper.accessor('commission_rate', {
    header: 'Commission Rate',
    cell: ({ getValue }) => {
      const value = getValue();

      return value != null ? `${value}%` : '-';
    },
  }),

  columnHelper.accessor('commission_amount', {
    header: 'Commission',
    cell: ({ getValue }) => {
      const value = getValue();

      return value
        ? `৳ ${Number(value).toLocaleString('en-BD', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : '-';
    },
  }),

  columnHelper.accessor('status_name', {
    header: 'Status',
    cell: ({ getValue }) => getValue() || '-',
  }),

  columnHelper.accessor('available_at', {
    header: 'Available At',
    cell: ({ getValue }) => {
      const value = getValue();

      if (!value) return '-';

      return new Date(String(value).replace(' ', 'T')).toLocaleString();
    },
  }),

  columnHelper.accessor('walleted_at', {
    header: 'Walleted At',
    cell: ({ getValue }) => {
      const value = getValue();

      if (!value) return '-';

      return new Date(String(value).replace(' ', 'T')).toLocaleString();
    },
  }),

  columnHelper.accessor('created_at', {
    header: 'Created At',
    cell: ({ getValue }) => {
      const value = getValue();

      if (!value) return '-';

      return new Date(String(value).replace(' ', 'T')).toLocaleString();
    },
  }),
]);

const OrderList = ({
  orderListData,
  pagination,
  onPaginationChange,
}: {
  orderListData: OrderListApiResponse;
  pagination: { pageIndex: number; pageSize: number };
  onPaginationChange: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
}) => {
  const { data, pagination: apiPagination } = orderListData;
  console.log('orderListData==', orderListData);
  return (
    <div className="rounded-xl border border-primary/20 bg-linear-to-br from-primary/5 via-transparent to-transparent backdrop-blur-sm shadow-lg shadow-primary/5 overflow-hidden">
      <DataTable
        columns={columns}
        data={data}
        title="Orders History"
        pageCount={apiPagination?.last_page}
        hasPagination={apiPagination?.last_page > 1}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
      />
    </div>
  );
};

export default OrderList;
