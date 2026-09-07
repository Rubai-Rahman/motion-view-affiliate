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
    <div className="space-y-4 border rounded-md p-2 bg-card">
      <div className="flex justify-between items-center">
        {title && (
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        )}

        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings2 className="size-4" />
                Columns
              </Button>
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
      <div className="rounded-md border">
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
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
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

      {/* Pagination controls */}
      {hasPagination && (
        <div className="flex items-center justify-end space-x-2">
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
