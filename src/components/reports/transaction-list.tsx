import {
  WithdrawRequestListApiResponse,
  WithdrawRequestItem,
} from '@/types/reports.types';
import { DataTable } from '@/components/ui/data-table/data-table';
import { createAppColumnHelper } from '@/components/ui/data-table/data-table-features';

const columnHelper = createAppColumnHelper<WithdrawRequestItem>();

const columns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'ID',
  }),
  columnHelper.accessor('reference_id', {
    header: 'Reference ID',
    cell: ({ getValue }) => getValue() || '-',
  }),
  columnHelper.accessor('transaction_type_name', {
    header: 'Type',
    cell: ({ getValue }) => getValue() || 'Withdrawal',
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: ({ getValue }) => getValue() || '-',
  }),
  columnHelper.accessor('amount_in', {
    header: 'Amount In',
    cell: ({ getValue }) => {
      const value = getValue();
      return value > 0 ? `$${value.toLocaleString()}` : '-';
    },
  }),
  columnHelper.accessor('amount_out', {
    header: 'Amount Out',
    cell: ({ getValue }) => {
      const value = getValue();
      return value > 0 ? `$${value.toLocaleString()}` : '-';
    },
  }),
  columnHelper.accessor('amount', {
    header: 'Total Amount',
    cell: ({ getValue }) => {
      const value = getValue();
      return value ? `$${Number(value).toLocaleString()}` : '-';
    },
  }),
  columnHelper.accessor('created_at', {
    header: 'Date',
    cell: ({ getValue }) => {
      const date = getValue();
      if (!date) return '-';
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
  }),
]);

const TransactionList = ({
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
  console.log('withdrawListData', withdrawListData);
  return (
    <div className="rounded-xl border border-primary/20 bg-linear-to-br from-primary/5 via-transparent to-transparent backdrop-blur-sm shadow-lg shadow-primary/5 overflow-hidden">
      <DataTable
        columns={columns}
        data={data}
        title="Transaction List"
        pageCount={apiPagination?.last_page}
        hasPagination={apiPagination?.last_page > 1}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
      />
    </div>
  );
};

export default TransactionList;
