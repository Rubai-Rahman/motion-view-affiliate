// data-features.ts
import {
  tableFeatures,
  createTableHook,
  rowPaginationFeature,
  rowSortingFeature,
  columnVisibilityFeature,
  columnFilteringFeature,
  createPaginatedRowModel,
  createSortedRowModel,
  createFilteredRowModel,
  sortFn_alphanumeric,
  sortFn_text,
  filterFn_includesString,
} from '@tanstack/react-table';

export const features = tableFeatures({
  rowPaginationFeature,
  rowSortingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
});

// This gives you a reusable `useAppTable` hook + a column helper
// that's already bound to `features`, so you never repeat this config.
export const { useAppTable, createAppColumnHelper } = createTableHook({
  features,
});
