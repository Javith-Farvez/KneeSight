import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Skeleton } from './Skeleton';
import { EmptyState } from './Skeleton';

/* ─────────────────────────────────────────────
   DataTable — KneeSight DS
───────────────────────────────────────────── */

export interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (row: T, index: number) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  key: string;
  direction: SortDirection;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  loading?: boolean;
  loadingRows?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  sort?: SortState;
  onSort?: (key: string) => void;
  onRowClick?: (row: T) => void;
  className?: string;
  stickyHeader?: boolean;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  loading = false,
  loadingRows = 4,
  emptyTitle = 'No results',
  emptyDescription,
  sort,
  onSort,
  onRowClick,
  className,
  stickyHeader = false,
}: DataTableProps<T>) {
  const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' };

  return (
    <div className={cn('w-full rounded-card border border-ds overflow-hidden bg-ds-surface shadow-ds-e1', className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead
            className={cn(
              'bg-ds-surface-2 border-b border-ds',
              stickyHeader && 'sticky top-0 z-10'
            )}
          >
            <tr>
              {columns.map((col) => {
                const isSorted = sort?.key === String(col.key);
                const SortIcon = isSorted
                  ? sort?.direction === 'asc' ? ChevronUp : ChevronDown
                  : ChevronsUpDown;

                return (
                  <th
                    key={String(col.key)}
                    style={col.width ? { width: col.width } : undefined}
                    className={cn(
                      'px-4 py-3 text-ds-label font-semibold uppercase tracking-wider text-ds-3',
                      alignClass[col.align ?? 'left'],
                      col.sortable && onSort && 'cursor-pointer select-none hover:text-ds-1 transition-colors duration-[120ms]',
                      col.headerClassName
                    )}
                    onClick={() => col.sortable && onSort?.(String(col.key))}
                  >
                    <div className={cn('flex items-center gap-1.5', col.align === 'right' && 'justify-end', col.align === 'center' && 'justify-center')}>
                      {col.header}
                      {col.sortable && onSort && (
                        <SortIcon className={cn('w-3.5 h-3.5 shrink-0', isSorted ? 'text-teal-500' : 'opacity-30')} />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-ds">
            {loading ? (
              Array.from({ length: loadingRows }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3.5">
                      <Skeleton className="h-3.5 w-full max-w-[140px]" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={keyExtractor(row, rowIndex)}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    'transition-colors duration-[120ms]',
                    onRowClick && 'cursor-pointer hover:bg-ds-surface-2'
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={cn(
                        'px-4 py-3.5 text-ds-small text-ds-2',
                        alignClass[col.align ?? 'left'],
                        col.cellClassName
                      )}
                    >
                      {col.render
                        ? col.render(row, rowIndex)
                        : String((row as Record<string, unknown>)[String(col.key)] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
