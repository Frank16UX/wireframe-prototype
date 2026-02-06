import { type NavItem } from '../data/navigation';
import { CategoryCard } from './CategoryCard';
import headerWoman from '../assets/images/HeaderAssets/9daf05f1efa0754bfb48f6f6a23c87d51abeca62.png';
import headerLine from '../assets/images/HeaderAssets/e703dbdec87088a708ca16f709d3effeed6ebc29.svg';

interface HomeViewProps {
  items: NavItem[];
  onCategoryClick: (item: NavItem) => void;
}

export function HomeView({ items, onCategoryClick }: HomeViewProps) {
  return (
    <div className="max-w-[1440px] mx-auto px-[15px] py-4 md:p-8">
      {/* Hero Section */}
      <div className="relative bg-[#FCE8BF] rounded-[24px] p-[15px] md:p-12 overflow-hidden mb-6 md:mb-12 min-h-[360px] md:min-h-[400px] flex flex-col justify-end md:justify-center">
        <div className="max-w-2xl relative z-20 w-full mb-4 md:mb-0">
          <p className="text-lg md:text-[18px] font-sans text-[#3E3E3E] mb-1 md:mb-2">Hello, {'{firstName}'}!</p>
          <h1 className="text-[32px] md:text-[48px] leading-[1.1] font-serif text-[#004F59] mb-4 md:mb-6 max-w-[280px] md:max-w-[500px]">
            Welcome to Marketing Imagery
          </h1>
          <p className="text-sm md:text-base text-[#3E3E3E] mb-8 max-w-[280px] md:max-w-xl pr-4 md:pr-0">
            Find the perfect assets to grow your business! Explore our library of marketing
            images, animations and videos to easily share them with your team or customers!
          </p>

          {/* Search Box */}
          <div className="relative max-w-md w-full md:max-w-[356px]">
            <input
              type="text"
              placeholder="Search assets"
              className="w-full bg-white border border-gray-200 rounded-[12px] text-base py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#004F59] shadow-sm placeholder:text-gray-400"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Hero Image / Illustration */}
        <div className="absolute right-[-20px] bottom-0 h-[85%] md:h-[115%] w-[60%] md:w-[45%] min-w-[220px] md:min-w-[450px] pointer-events-none">
           <div className="absolute bottom-[-10px] right-0 h-full w-full flex items-end justify-end">
            <img 
              src={headerWoman} 
              alt="Woman with tablet" 
              className="w-full h-full object-contain object-bottom relative z-10"
            />
            {/* Blob Outline Shape */}
            <div className="absolute top-[50%] left-1/2 -translate-x-[45%] -translate-y-[45%] w-[110%] md:w-[130%] aspect-[392/388] z-0">
                <img 
                  src={headerLine}
                  alt=""
                  className="w-full h-full opacity-90"
                />
            </div>
           </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[10px] md:gap-6">
        {items.map((item) => (
          <CategoryCard
            key={item.id}
            id={item.id}
            label={item.label}
            onClick={() => onCategoryClick(item)}
          />
        ))}
      </div>
    </div>
  );
}

