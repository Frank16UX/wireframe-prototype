import { useState, useMemo } from 'react';
import { AssetCard } from './AssetCard';
import { AssetToolbar } from './AssetToolbar';
import { FilterResultsBar } from './FilterResultsBar';

interface AssetViewProps {
  categoryName: string;
  parentName: string;
  onBack: () => void;
  onBackToHome: () => void;
}

// Asset type definition
type AssetType = 'image' | 'video' | 'gif' | 'document';
type ContentType = 'words-to-say' | 'asset-only';
type UsageType = 'post-message' | 'story' | 'page-cover' | 'group-cover' | 'template';
type OrientationType = 'square' | 'horizontal' | 'vertical';

interface Asset {
  id: number;
  fileName: string;
  fileType: AssetType;
  content: ContentType;
  usage: UsageType[];
  orientation: OrientationType;
}

// Mock asset data with randomized attributes
const generateMockAssets = (): Asset[] => {
  const fileTypes: AssetType[] = ['image', 'video', 'gif', 'document'];
  const contentTypes: ContentType[] = ['words-to-say', 'asset-only'];
  const usageTypes: UsageType[] = ['post-message', 'story', 'page-cover', 'group-cover', 'template'];
  const orientationTypes: OrientationType[] = ['square', 'horizontal', 'vertical'];

  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    fileName: `Asset Name Example ${i + 1}`,
    fileType: fileTypes[i % fileTypes.length],
    content: contentTypes[i % contentTypes.length],
    usage: [
      usageTypes[i % usageTypes.length],
      usageTypes[(i + 1) % usageTypes.length],
    ],
    orientation: orientationTypes[i % orientationTypes.length],
  }));
};

const mockAssets = generateMockAssets();

// Placeholder thumbnail image
const thumbnailUrl = '/placeholder-thumbnail.png';

// Filter label mapping
const filterLabels: Record<string, string> = {
  'words-to-say': 'Words to say',
  'asset-only': 'Asset only',
  'post-message': 'Post/Message',
  'story': 'Story',
  'page-cover': 'Page Cover',
  'group-cover': 'Group Cover',
  'template': 'Template',
  'square': 'Square',
  'horizontal': 'Horizontal',
  'vertical': 'Vertical',
};

export function AssetView({ categoryName, parentName, onBack, onBackToHome }: AssetViewProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'ascending' | 'descending'>('ascending');
  const [contentFilter, setContentFilter] = useState<ContentType | null>(null);
  const [usageFilters, setUsageFilters] = useState<string[]>([]);
  const [orientationFilters, setOrientationFilters] = useState<string[]>([]);

  // Filter and sort assets
  const filteredAndSortedAssets = useMemo(() => {
    let filtered = [...mockAssets];

    // Apply type filters
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(asset => selectedTypes.includes(asset.fileType));
    }

    // Apply content filter
    if (contentFilter) {
      filtered = filtered.filter(asset => asset.content === contentFilter);
    }

    // Apply usage filters (asset must have at least one matching usage)
    if (usageFilters.length > 0) {
      filtered = filtered.filter(asset =>
        asset.usage.some(usage => usageFilters.includes(usage))
      );
    }

    // Apply orientation filters
    if (orientationFilters.length > 0) {
      filtered = filtered.filter(asset => orientationFilters.includes(asset.orientation));
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortOrder === 'ascending') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });

    return filtered;
  }, [selectedTypes, sortOrder, contentFilter, usageFilters, orientationFilters]);

  // Build active filters list for the results bar
  const activeFilters = useMemo(() => {
    const filters: Array<{ id: string; label: string; category: string }> = [];

    if (contentFilter) {
      filters.push({
        id: contentFilter,
        label: filterLabels[contentFilter],
        category: 'content',
      });
    }

    usageFilters.forEach(usage => {
      filters.push({
        id: usage,
        label: filterLabels[usage],
        category: 'usage',
      });
    });

    orientationFilters.forEach(orientation => {
      filters.push({
        id: orientation,
        label: filterLabels[orientation],
        category: 'orientation',
      });
    });

    return filters;
  }, [contentFilter, usageFilters, orientationFilters]);

  const handleRemoveFilter = (filterId: string, category: string) => {
    if (category === 'content') {
      setContentFilter(null);
    } else if (category === 'usage') {
      setUsageFilters(usageFilters.filter(u => u !== filterId));
    } else if (category === 'orientation') {
      setOrientationFilters(orientationFilters.filter(o => o !== filterId));
    }
  };

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className="p-[15px] md:p-[25px]">
      {/* Header with border */}
      <div className="pb-6 mb-6 border-b-2 border-gray-300">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-gray-600" style={{ fontSize: '16px' }}>
          <button onClick={onBackToHome} className="hover:text-gray-900">
            Home
          </button>
          <span>&gt;</span>
          <button onClick={onBackToHome} className="hover:text-gray-900">
            Library
          </button>
          <span>&gt;</span>
          <button onClick={onBack} className="hover:text-gray-900">
            {parentName}
          </button>
        </div>

        {/* Title */}
        <div>
          <h1 className="font-bold" style={{ fontSize: '26px' }}>{categoryName}</h1>
        </div>
      </div>

      {/* Toolbar */}
      <AssetToolbar
        selectedTypes={selectedTypes}
        onTypeFilterChange={setSelectedTypes}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        contentFilter={contentFilter}
        usageFilters={usageFilters}
        orientationFilters={orientationFilters}
        onContentFilterChange={setContentFilter}
        onUsageFiltersChange={setUsageFilters}
        onOrientationFiltersChange={setOrientationFilters}
      />

      {/* Filter Results Bar */}
      {hasActiveFilters && (
        <FilterResultsBar
          resultCount={filteredAndSortedAssets.length}
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onOpenFilters={() => {
            // This would open the filter dropdown - handled by toolbar
          }}
        />
      )}

      {/* Asset Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-[repeat(auto-fit,minmax(234px,306px))] gap-[10px] md:gap-[25px]">
        {filteredAndSortedAssets.map((asset) => (
          <AssetCard
            key={asset.id}
            fileName={asset.fileName}
            fileType={asset.fileType}
            thumbnailUrl={thumbnailUrl}
          />
        ))}
      </div>

      {/* No results message */}
      {filteredAndSortedAssets.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg font-medium mb-2">No assets found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}

