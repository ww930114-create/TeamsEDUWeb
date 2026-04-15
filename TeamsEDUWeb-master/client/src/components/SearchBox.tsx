import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Search, X, ArrowRight, BookOpen, BarChart3, Database, Lightbulb, HelpCircle, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchContent, SearchItem } from '@/data/searchData';

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-4 h-4" />,
  BarChart3: <BarChart3 className="w-4 h-4" />,
  Database: <Database className="w-4 h-4" />,
  Lightbulb: <Lightbulb className="w-4 h-4" />,
  HelpCircle: <HelpCircle className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
};

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [, setLocation] = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search when query changes
  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchContent(query);
      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle result selection
  const handleSelect = (item: SearchItem) => {
    setLocation(item.path);
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full sm:w-72">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="搜尋教學內容..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && results.length > 0 && setIsOpen(true)}
          className="pl-10 pr-10 bg-secondary/50 border-transparent focus-visible:border-primary w-full"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50">
          <div className="py-2 max-h-96 overflow-y-auto">
            {results.map((item, index) => (
              <button
                key={`${item.path}-${index}`}
                onClick={() => handleSelect(item)}
                className={`w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors flex items-start gap-3 ${
                  selectedIndex === index ? 'bg-secondary' : ''
                }`}
              >
                {/* Icon */}
                <div className="shrink-0 mt-0.5">
                  {item.icon && iconMap[item.icon] ? (
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {iconMap[item.icon]}
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <FileText className="w-4 h-4" />
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground truncate">
                      {item.title}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary shrink-0">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>
                
                {/* Arrow */}
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
              </button>
            ))}
          </div>
          
          {/* Footer */}
          <div className="px-4 py-2 border-t border-border bg-secondary/30">
            <p className="text-xs text-muted-foreground">
              按 <kbd className="px-1.5 py-0.5 bg-background rounded text-[10px]">Enter</kbd> 選擇，
              <kbd className="px-1.5 py-0.5 bg-background rounded text-[10px] ml-1">↑↓</kbd> 導覽，
              <kbd className="px-1.5 py-0.5 bg-background rounded text-[10px] ml-1">Esc</kbd> 關閉
            </p>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg p-4 z-50">
          <p className="text-sm text-muted-foreground text-center">
            沒有找到「<span className="text-foreground font-medium">{query}</span>」相關內容
          </p>
          <p className="text-xs text-muted-foreground text-center mt-1">
            試試其他關鍵字，如：DAX、視覺化、閘道、權限
          </p>
        </div>
      )}
    </div>
  );
}
