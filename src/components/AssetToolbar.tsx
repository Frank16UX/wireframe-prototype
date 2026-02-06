import { useState, useRef, useEffect } from 'react';

interface AssetToolbarProps {
  selectedTypes: string[];
  onTypeFilterChange: (types: string[]) => void;
  sortOrder: 'ascending' | 'descending';
  onSortChange: (order: 'ascending' | 'descending') => void;
  contentFilter: 'words-to-say' | 'asset-only' | null;
  usageFilters: string[];
  orientationFilters: string[];
  onContentFilterChange: (filter: 'words-to-say' | 'asset-only' | null) => void;
  onUsageFiltersChange: (filters: string[]) => void;
  onOrientationFiltersChange: (filters: string[]) => void;
}

const assetTypes = [
  { id: 'image', label: 'Images', icon: '🖼️' },
  { id: 'gif', label: 'GIFs', icon: '🎞️' },
  { id: 'video', label: 'Videos', icon: '🎥' },
  { id: 'document', label: 'Documents', icon: '📄' },
];

const usageOptions = [
  { id: 'post-message', label: 'Post/Message' },
  { id: 'story', label: 'Story' },
  { id: 'page-cover', label: 'Page Cover' },
  { id: 'group-cover', label: 'Group Cover' },
  { id: 'template', label: 'Template' },
];

const orientationOptions = [
  { id: 'square', label: 'Square' },
  { id: 'horizontal', label: 'Horizontal' },
  { id: 'vertical', label: 'Vertical' },
];

export function AssetToolbar({
  selectedTypes,
  onTypeFilterChange,
  sortOrder,
  onSortChange,
  contentFilter,
  usageFilters,
  orientationFilters,
  onContentFilterChange,
  onUsageFiltersChange,
  onOrientationFiltersChange,
}: AssetToolbarProps) {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTypeClick = (typeId: string) => {
    const isSelected = selectedTypes.includes(typeId);
    
    if (isSelected) {
      // Deselect
      onTypeFilterChange(selectedTypes.filter(t => t !== typeId));
    } else {
      // Check if we already have 3 selected
      if (selectedTypes.length === 3) {
        // Clear all and select only this one
        onTypeFilterChange([]);
      } else {
        // Add to selection
        onTypeFilterChange([...selectedTypes, typeId]);
      }
    }
  };

  const handleUsageToggle = (usageId: string) => {
    if (usageFilters.includes(usageId)) {
      onUsageFiltersChange(usageFilters.filter(u => u !== usageId));
    } else {
      onUsageFiltersChange([...usageFilters, usageId]);
    }
  };

  const handleOrientationToggle = (orientationId: string) => {
    if (orientationFilters.includes(orientationId)) {
      onOrientationFiltersChange(orientationFilters.filter(o => o !== orientationId));
    } else {
      onOrientationFiltersChange([...orientationFilters, orientationId]);
    }
  };

  const hasActiveFilters = contentFilter !== null || usageFilters.length > 0 || orientationFilters.length > 0;

  return (
    <div className="flex items-center gap-3 mb-4 min-w-0">
      {/* Quick Filter Chips */}
      <div className="flex items-center gap-2 flex-1 overflow-x-auto min-w-0 scrollbar-hide">
        {assetTypes.map((type) => {
          const isSelected = selectedTypes.includes(type.id);
          return (
            <button
              key={type.id}
              onClick={() => handleTypeClick(type.id)}
              className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                isSelected
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {type.label}
            </button>
          );
        })}
      </div>

      {/* Sort Button */}
      <div className="relative" ref={sortRef}>
        <button
          onClick={() => setShowSortDropdown(!showSortDropdown)}
          className="p-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          title="Sort"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 6h18M3 12h12M3 18h6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {showSortDropdown && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-10">
            <div className="p-2">
              <div className="text-xs font-bold text-gray-500 px-3 py-2">SORTING</div>
              <button
                onClick={() => {
                  onSortChange('ascending');
                  setShowSortDropdown(false);
                }}
                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                  sortOrder === 'ascending' ? 'bg-gray-100 font-medium' : ''
                }`}
              >
                Ascending
              </button>
              <button
                onClick={() => {
                  onSortChange('descending');
                  setShowSortDropdown(false);
                }}
                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                  sortOrder === 'descending' ? 'bg-gray-100 font-medium' : ''
                }`}
              >
                Descending
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Filter Button */}
      <div className="relative" ref={filterRef}>
        <button
          onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          className="p-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors relative"
          title="Filter"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {hasActiveFilters && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full border-2 border-white" />
          )}
        </button>

        {showFilterDropdown && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-10">
            <div className="p-4 space-y-4">
              {/* Content Filter - Segmented Control */}
              <div>
                <div className="text-xs font-bold text-gray-500 mb-2">CONTENT</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onContentFilterChange(contentFilter === 'words-to-say' ? null : 'words-to-say')}
                    className={`flex-1 px-3 py-2 text-sm rounded border-2 transition-colors ${
                      contentFilter === 'words-to-say'
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Words to say
                  </button>
                  <button
                    onClick={() => onContentFilterChange(contentFilter === 'asset-only' ? null : 'asset-only')}
                    className={`flex-1 px-3 py-2 text-sm rounded border-2 transition-colors ${
                      contentFilter === 'asset-only'
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Asset only
                  </button>
                </div>
              </div>

              {/* Usage Filters - Checkboxes */}
              <div>
                <div className="text-xs font-bold text-gray-500 mb-2">USAGE</div>
                <div className="space-y-2">
                  {usageOptions.map((option) => (
                    <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={usageFilters.includes(option.id)}
                        onChange={() => handleUsageToggle(option.id)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Orientation Filters - Checkboxes */}
              <div>
                <div className="text-xs font-bold text-gray-500 mb-2">ORIENTATION</div>
                <div className="space-y-2">
                  {orientationOptions.map((option) => (
                    <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={orientationFilters.includes(option.id)}
                        onChange={() => handleOrientationToggle(option.id)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear All Button */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    onContentFilterChange(null);
                    onUsageFiltersChange([]);
                    onOrientationFiltersChange([]);
                  }}
                  className="w-full py-2 text-sm font-medium text-gray-600 hover:text-black border border-gray-300 hover:border-black rounded transition-colors"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
