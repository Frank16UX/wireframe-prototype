import type { NavItem } from '../data/navigation';

interface CategoryViewProps {
  category: NavItem;
  onBack: () => void;
  onSubcategoryClick?: (item: NavItem) => void;
}

export function CategoryView({ category, onBack, onSubcategoryClick }: CategoryViewProps) {
  const items = category.children || [];

  return (
    <div className="p-[15px] md:p-[25px] min-w-0 w-full">
      {/* Header with border */}
      <div className="pb-6 mb-6 border-b-2 border-gray-300">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-gray-600" style={{ fontSize: '16px' }}>
          <button onClick={onBack} className="hover:text-gray-900">
            Home
          </button>
          <span>&gt;</span>
          <span>Library</span>
        </div>

        {/* Title */}
        <div>
          <h1 className="font-bold" style={{ fontSize: '26px' }}>{category.label}</h1>
        </div>
      </div>

      {/* Grid of subcategories */}
      <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-[repeat(auto-fit,minmax(234px,306px))] gap-[10px] md:gap-[25px]">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSubcategoryClick?.(item)}
            className="border-2 border-gray-300 rounded-lg p-[15px] md:p-[25px] hover:border-gray-400 cursor-pointer transition-colors"
          >
            {/* Icon placeholder */}
            <div className="w-16 h-16 border-2 border-gray-400 rounded-lg mb-4 flex items-center justify-center">
              <div className="w-10 h-10 bg-gray-300 rounded" />
            </div>

            {/* Label */}
            <h3 className="text-sm font-medium">{item.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
