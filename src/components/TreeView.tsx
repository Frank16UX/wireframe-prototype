import { useState, useEffect } from 'react';
import type { NavItem } from '../data/navigation';

interface TreeViewProps {
  items: NavItem[];
  onItemClick: (item: NavItem) => void;
  selectedId?: string;
  level?: number;
}

export function TreeView({ items, onItemClick, selectedId, level = 0 }: TreeViewProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Automatically expand parent if a child is selected
  useEffect(() => {
    if (selectedId) {
      const pathToExpand: string[] = [];
      
      const findSelected = (navItems: NavItem[]): boolean => {
        for (const item of navItems) {
          if (item.id === selectedId) return true;
          if (item.children && findSelected(item.children)) {
            pathToExpand.push(item.id);
            return true;
          }
        }
        return false;
      };

      findSelected(items);
      
      if (pathToExpand.length > 0) {
        setExpandedItems((prev) => {
          const next = new Set(prev);
          pathToExpand.forEach(id => next.add(id));
          return next;
        });
      }
    }
  }, [selectedId, items]);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={level === 0 ? 'space-y-1' : 'space-y-0.5'}>
      {items.map((item) => {
        const isExpanded = expandedItems.has(item.id);
        const hasChildren = item.children && item.children.length > 0;
        const isSelected = item.id === selectedId;

        return (
          <div key={item.id}>
            <div
              className={`flex items-start gap-2 py-2 px-4 ${
                isSelected ? 'bg-gray-200 border-l-4 border-black' : 'hover:bg-gray-100'
              } cursor-pointer transition-colors`}
              style={{ paddingLeft: `${isSelected ? (16 + level * 16 - 4) : (16 + level * 16)}px` }}
              onClick={() => onItemClick(item)}
            >
              {/* Left side: Icon and Label */}
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <div className={`w-6 h-6 border-2 rounded flex-shrink-0 flex items-center justify-center mt-0.5 ${
                  isSelected ? 'border-black bg-gray-300 text-black' : 'border-gray-400'
                }`}>
                  <div className={`w-3 h-3 rounded-sm ${isSelected ? 'bg-black' : 'bg-gray-300'}`} />
                </div>
                <span className={`text-sm mt-1 flex-1 break-words ${isSelected ? 'font-semibold text-black' : ''}`}>
                  {item.label}
                </span>
              </div>

              {/* Right side: Chevron */}
              {hasChildren ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(item.id, e);
                  }}
                  className={`p-1 rounded flex-shrink-0 mt-0.5 ml-1 transition-colors ${
                    isSelected ? 'hover:bg-gray-300' : 'hover:bg-gray-300'
                  }`}
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`transform transition-transform ${
                      isExpanded ? '-rotate-90' : 'rotate-90'
                    } ${isSelected ? 'text-black' : 'text-gray-500'}`}
                  >
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                <div className="w-6 flex-shrink-0" />
              )}
            </div>

            {hasChildren && isExpanded && (
              <TreeView
                items={item.children!}
                onItemClick={onItemClick}
                selectedId={selectedId}
                level={level + 1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
