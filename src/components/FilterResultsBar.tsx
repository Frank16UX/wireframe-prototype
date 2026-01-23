interface FilterResultsBarProps {
  resultCount: number;
  activeFilters: Array<{ id: string; label: string; category: string }>;
  onRemoveFilter: (filterId: string, category: string) => void;
  onOpenFilters: () => void;
}

export function FilterResultsBar({
  resultCount,
  activeFilters,
  onRemoveFilter,
  onOpenFilters,
}: FilterResultsBarProps) {
  const visibleFilters = activeFilters.slice(0, 5);
  const overflowCount = Math.max(0, activeFilters.length - 5);

  return (
    <div className="flex items-center gap-3 mb-4 flex-wrap">
      {/* Result Count */}
      <div className="text-sm font-medium text-gray-700">
        Showing {resultCount} result{resultCount !== 1 ? 's' : ''}
      </div>

      {/* Filter Chips */}
      {visibleFilters.map((filter) => (
        <div
          key={`${filter.category}-${filter.id}`}
          className="flex items-center gap-2 px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm"
        >
          <span>{filter.label}</span>
          <button
            onClick={() => onRemoveFilter(filter.id, filter.category)}
            className="hover:text-gray-900 text-gray-600"
            aria-label={`Remove ${filter.label} filter`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor">
              <path d="M3 3l8 8M11 3l-8 8" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ))}

      {/* Overflow Chip */}
      {overflowCount > 0 && (
        <button
          onClick={onOpenFilters}
          className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm hover:bg-gray-200 transition-colors"
        >
          +{overflowCount} Filter{overflowCount !== 1 ? 's' : ''}
        </button>
      )}
    </div>
  );
}
