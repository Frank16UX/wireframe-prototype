import { CategoryIcon } from './CategoryIcons';

interface CategoryCardProps {
  id: string;
  label: string;
  onClick: () => void;
}

export function CategoryCard({ id, label, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col bg-white border border-[#E0E0E0] rounded-[10px] hover:border-[#1A5961] transition-all duration-300 text-left w-full overflow-hidden"
    >
      {/* Mobile Layout (Visible only on mobile) */}
      <div className="flex flex-col md:hidden p-[15px] w-full aspect-[160/128]">
        <div className="flex justify-between items-start w-full mb-auto">
          {/* Mobile Icon Box */}
          <div className="w-[60px] h-[60px] bg-[#EEF8F9] rounded-[8px] flex items-center justify-center p-2.5 relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
            {/* Subtle Sparkles Pattern */}
            <div className="absolute top-1.5 right-2 text-[#91C3CB] opacity-40 text-[8px]">✦</div>
            <div className="absolute bottom-2.5 left-2 text-[#91C3CB] opacity-30 text-[6px]">●</div>
            <CategoryIcon id={id} className="w-full h-full relative z-10" />
          </div>

          {/* Mobile Menu Icon */}
          <div 
            className="p-1 text-gray-400 hover:text-[#1A5961] transition-colors mt-[-4px] mr-[-4px]"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="7" r="1.5" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="12" cy="17" r="1.5" fill="currentColor" />
            </svg>
          </div>
        </div>
        <h3 className="text-[16px] font-medium text-[#3E3E3E] shrink-0 leading-[1.2] group-hover:text-[#1A5961] transition-colors mt-2">
          {label}
        </h3>
      </div>

      {/* Desktop Layout (Visible only on desktop/tablet) */}
      <div className="hidden md:flex flex-col w-full min-w-[234px] min-h-[206px]">
        {/* Graphic Area */}
        <div className="relative w-full aspect-[234/128] bg-[#EEF8F9] flex items-center justify-center p-8 overflow-hidden">

          <div className="relative z-10 w-24 h-24 transition-transform duration-300 group-hover:scale-110">
            <CategoryIcon id={id} className="w-full h-full" />
          </div>

          {/* Desktop Menu Icon */}
          <div 
            className="absolute top-3 right-3 p-1 text-gray-400 hover:text-[#1A5961] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="7" r="1.5" fill="currentColor" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="12" cy="17" r="1.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Label Area */}
        <div className="p-5 flex-1 flex flex-col justify-center">
          <h3 className="text-[18px] font-medium text-[#3E3E3E] leading-[1.3] group-hover:text-[#1A5961] transition-colors">
            {label}
          </h3>
        </div>
      </div>
    </button>
  );
}
