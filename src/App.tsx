import { useState, useMemo } from 'react';
import { type NavItem, navigationData } from './data/navigation';
import { APP_CONFIG } from './config';
import { MobileDrawer } from './components/MobileDrawer';
import { DesktopSidebar } from './components/DesktopSidebar';
import { HomeView } from './components/HomeView';
import { CategoryView } from './components/CategoryView';
import { AssetView } from './components/AssetView';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'assets'>('home');
  const [selectedCategory, setSelectedCategory] = useState<NavItem | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<NavItem | null>(null);

  // Process navigation data based on configuration
  const processedNavigation = useMemo(() => {
    if (APP_CONFIG.maxNavLevels === 2) {
      return navigationData.flatMap(item => {
        // Special handling for 'Offers' to promote its children (months) as top level categories
        if (item.id === 'offers' && item.children) {
          return item.children.map(child => ({
            ...child,
            // Update label to match original MD structure (e.g. "January Offers")
            label: child.label.replace(' 2026', '') + ' Offers'
          }));
        }
        return item;
      });
    }
    return navigationData;
  }, []);

  // Helper to find parent category for a subcategory (recursive)
  const findParent = (items: NavItem[], targetId: string): NavItem | null => {
    for (const item of items) {
      if (item.children?.some(child => child.id === targetId)) {
        return item;
      }
      if (item.children) {
        const found = findParent(item.children, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  const handleNavigate = (item: NavItem) => {
    if (item.children && item.children.length > 0) {
      setSelectedCategory(item);
      setSelectedSubcategory(null);
      setCurrentView('category');
    } else {
      // It's a leaf node (assets)
      const parent = findParent(processedNavigation, item.id);
      if (parent) {
        setSelectedCategory(parent);
        setSelectedSubcategory(item);
        setCurrentView('assets');
      } else {
        // Fallback for root items with no children
        setSelectedCategory(item);
        setSelectedSubcategory(null);
        setCurrentView('category');
      }
    }
    setIsDrawerOpen(false);
  };

  const handleSubcategoryClick = (item: NavItem) => {
    setSelectedSubcategory(item);
    setCurrentView('assets');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const handleBackToCategory = () => {
    setCurrentView('category');
    setSelectedSubcategory(null);
  };

  const currentFolderLabel = useMemo(() => {
    if (currentView === 'home') return 'Home';
    if (currentView === 'assets') return selectedSubcategory?.label || 'Assets';
    return selectedCategory?.label || 'Library';
  }, [currentView, selectedCategory, selectedSubcategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-2 border-gray-300 p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border-2 border-gray-400 rounded flex items-center justify-center">
              <div className="text-xs font-bold">PC</div>
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-bold text-gray-500">Consultant's Corner</div>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <button className="px-3 py-2 hover:bg-gray-100 rounded">
              MY BUSINESS
            </button>
            <button className="px-3 py-2 hover:bg-gray-100 rounded">
              MY TEAM
            </button>
            <button className="px-3 py-2 bg-gray-200 rounded font-medium">
              MARKETING RESOURCES
            </button>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded">
              <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-300 rounded-sm" />
              </div>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full" />
              </div>
            </button>
          </div>
        </div>

        {/* Sub-navigation */}
        <div className="mt-4 flex gap-4 text-sm overflow-x-auto">
          <button className="whitespace-nowrap px-3 py-2 hover:bg-gray-100 rounded">
            Monthly Focus
          </button>
          <button className="whitespace-nowrap px-3 py-2 bg-gray-200 rounded font-medium border-b-2 border-gray-800">
            Marketing Imagery
          </button>
          <button className="whitespace-nowrap px-3 py-2 hover:bg-gray-100 rounded">
            Plan a Party
          </button>
          <button className="whitespace-nowrap px-3 py-2 hover:bg-gray-100 rounded">
            Message Templates
          </button>
          <button className="whitespace-nowrap px-3 py-2 hover:bg-gray-100 rounded">
            Program Overviews
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        {currentView !== 'home' && (
          <DesktopSidebar
            items={processedNavigation}
            onNavigate={handleNavigate}
            selectedId={selectedSubcategory?.id || selectedCategory?.id}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 pb-20 md:pb-0">
          {currentView === 'home' && (
            <HomeView items={processedNavigation} onCategoryClick={handleNavigate} />
          )}
          {currentView === 'category' && selectedCategory && (
            <CategoryView 
              category={selectedCategory} 
              onBack={handleBackToHome}
              onSubcategoryClick={handleSubcategoryClick}
            />
          )}
          {currentView === 'assets' && selectedSubcategory && selectedCategory && (
            <AssetView
              categoryName={selectedSubcategory.label}
              parentName={selectedCategory.label}
              onBack={handleBackToCategory}
              onBackToHome={handleBackToHome}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 md:hidden z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-center">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="w-full flex flex-col items-center gap-1 py-3 px-6 hover:bg-gray-100"
          >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-3" />
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-sm font-bold text-gray-800">
                {currentFolderLabel}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-400 ml-1">
                <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={processedNavigation}
        onNavigate={handleNavigate}
        selectedId={selectedSubcategory?.id || selectedCategory?.id}
      />
    </div>
  );
}

export default App;

