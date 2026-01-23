import { type NavItem } from '../data/navigation';

interface HomeViewProps {
  items: NavItem[];
  onCategoryClick: (item: NavItem) => void;
}

export function HomeView({ items, onCategoryClick }: HomeViewProps) {
  return (
    <div className="p-[15px] md:p-[25px]">
      {/* Welcome Section */}
      <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-[15px] md:p-[25px] mb-6">
        <h1 className="text-2xl font-bold mb-2">Hello, {'{firstName}'}!</h1>
        <h2 className="text-xl text-gray-700 mb-4">Welcome to Marketing Imagery</h2>
        <p className="text-sm text-gray-600 mb-4">
          Find the perfect assets to grow your business! Explore our library of marketing
          images, animations and videos to easily share them with your team or customers!
        </p>

        {/* Search box placeholder */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search assets"
            className="w-full border-2 border-gray-300 rounded-lg py-2 px-4 pr-10"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 12L16 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Image placeholder */}
        <div className="mt-4 w-32 h-32 border-2 border-gray-300 rounded-lg bg-white ml-auto flex items-center justify-center">
          <div className="w-20 h-20 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-[repeat(auto-fit,minmax(234px,306px))] gap-[10px] md:gap-[25px]">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onCategoryClick(item)}
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

