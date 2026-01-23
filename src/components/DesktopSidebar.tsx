import { type NavItem } from '../data/navigation';
import { TreeView } from './TreeView';

interface DesktopSidebarProps {
  items: NavItem[];
  onNavigate: (item: NavItem) => void;
  selectedId?: string;
}

export function DesktopSidebar({ items, onNavigate, selectedId }: DesktopSidebarProps) {
  return (
    <div className="hidden md:block w-64 border-r-2 border-gray-300 h-screen overflow-y-auto">
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
  );
}
