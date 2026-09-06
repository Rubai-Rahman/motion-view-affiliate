// data-features.ts
import {
  tableFeatures,
  createTableHook,
  rowPaginationFeature,
  rowSortingFeature,
  columnFilteringFeature,
  createPaginatedRowModel,
  createSortedRowModel,
  createFilteredRowModel,
} from '@tanstack/react-table';

export const features = tableFeatures({
  rowPaginationFeature,
  rowSortingFeature,
  columnFilteringFeature,
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
});

// This gives you a reusable `useAppTable` hook + a column helper
// that's already bound to `features`, so you never repeat this config.
export const { useAppTable, createAppColumnHelper } = createTableHook({
  features,
});
