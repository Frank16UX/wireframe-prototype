import { type NavItem } from '../data/navigation';
import { TreeView } from './TreeView';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  onNavigate: (item: NavItem) => void;
  selectedId?: string;
}

export function MobileDrawer({ isOpen, onClose, items, onNavigate, selectedId }: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-0 bg-white z-50 md:hidden overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-gray-300 p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Marketing Imagery</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Home Link */}
        <div className="border-b-2 border-gray-300">
          <div className="flex items-center gap-3 p-4 hover:bg-gray-100">
            <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-300 rounded-sm" />
            </div>
            <span className="text-sm font-medium">Home</span>
          </div>
        </div>

        {/* Library Section */}
        <div className="p-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Library
          </h3>
          <TreeView
            items={items}
            onItemClick={onNavigate}
            selectedId={selectedId}
          />
        </div>
      </div>
    </>
  );
}
