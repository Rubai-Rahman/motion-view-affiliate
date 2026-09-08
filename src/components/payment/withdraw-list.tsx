import { DataTable } from '@/components/ui/data-table/data-table';
import { createAppColumnHelper } from '@/components/ui/data-table/data-table-features';
import {
  WithdrawRequestItem,
  WithdrawRequestListApiResponse,
} from '@/types/payment.types';

const columnHelper = createAppColumnHelper<WithdrawRequestItem>();

const columns = columnHelper.columns([
  columnHelper.display({
    id: 'index',
    header: 'ID',
    cell: ({ row }) => row.index + 1,
  }),

  columnHelper.accessor('payment_account', {
    header: 'Account No',
    cell: ({ getValue }) => getValue() || '-',
  }),

  columnHelper.accessor('payment_method_name', {
    header: 'Payment Method',
    cell: ({ getValue }) => getValue() || '-',
  }),

  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: ({ getValue }) => {
      const value = getValue();

      return value > 0 ? `৳ ${value.toLocaleString()}` : '-';
    },
  }),

  columnHelper.accessor('status_name', {
    header: 'Status',
    cell: ({ getValue }) => getValue() || '-',
  }),

  columnHelper.accessor('transaction_reference', {
    header: 'Reference',
    cell: ({ getValue }) => getValue() || '-',
  }),

  columnHelper.accessor('created_at', {
    header: 'Created At',
    cell: ({ getValue }) => {
      const value = getValue();
      if (!value) return '-';
      return new Date(value).toLocaleString();
    },
  }),

  columnHelper.accessor('processed_at', {
    header: 'Processed At',
    cell: ({ getValue }) => {
      const value = getValue();

      if (!value) return '-';

      return new Date(value).toLocaleString();
    },
  }),
]);

const WithdrawList = ({
  withdrawListData,
  pagination,
  onPaginationChange,
}: {
  withdrawListData: WithdrawRequestListApiResponse;
  pagination: { pageIndex: number; pageSize: number };
  onPaginationChange: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
}) => {
  const { data, pagination: apiPagination } = withdrawListData;

  return (
    <div className="rounded-xl border border-primary/20 bg-linear-to-br from-primary/5 via-transparent to-transparent backdrop-blur-sm shadow-lg shadow-primary/5 overflow-hidden">
      <DataTable
        columns={columns}
        data={data}
        title="Withdrawal Requests History"
        pageCount={apiPagination?.last_page}
        hasPagination={apiPagination?.last_page > 1}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
      />
    </div>
  );
};

export default WithdrawList;
