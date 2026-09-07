'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { ColumnDef, RowData } from '@tanstack/react-table';
import { useAppTable, type features } from './data-table-features';
import { ArrowDownUp, MoveDown, MoveUp, Settings2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TableSkeleton from '@/components/skeleton/table-skeleton';
interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<typeof features, TData>[];
  data: TData[];
  pageCount?: number;
  isLoading?: boolean;
  title?: string;
  hasPagination?: boolean;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  pageCount,
  isLoading,
  title,
  hasPagination = true,
}: DataTableProps<TData>) {
  const table = useAppTable(
    {
      key: 'data-table',
      columns,
      data,

      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 15,
        },
      },

      ...(pageCount !== undefined ? { manualPagination: true, pageCount } : {}),
    },
    (state) => ({
      pagination: state.pagination,
      sorting: state.sorting,
      columnVisibility: state.columnVisibility,
    }),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-6 pt-6">
        {title && (
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        )}

        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              <Settings2 className="size-4" />
              Columns
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header as string}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="px-6">
        <div className="rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : ''
                      }
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-1">
                          <table.FlexRender header={header} />
                          {header.column.getCanSort() &&
                            ({
                              asc: (
                                <MoveUp className="size-3.5 text-foreground" />
                              ),
                              desc: (
                                <MoveDown className="size-3.5 text-foreground" />
                              ),
                            }[header.column.getIsSorted() as string] ?? (
                              <ArrowDownUp className="size-3.5 text-foreground" />
                            ))}
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableSkeleton />
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        <table.FlexRender cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination controls */}
      {hasPagination && (
        <div className="flex items-center justify-end space-x-2 px-6 pb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {table.state.pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
