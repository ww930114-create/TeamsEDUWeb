import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from "../contexts/ThemeContext";
import CviluxLogo from '../assets/CviLuxLogo.png';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    // 把原本的「入門指南」跟「核心概念」合併成這個
    { href: "/practicalguide", label: "操作教學" },
    { href: "/concepts/chat-channels", label: "聊天與頻道" },
    { href: "/concepts/meetings", label: "會議管理" },
    { href: "/scenarios", label: "應用情境" },
    { href: "/support/faq", label: "常見問題" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container relative flex items-center h-16">
        {/* Left: Logo */}
        <div className="flex-1 flex items-center justify-start">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <img
              src={CviluxLogo}
              alt="CviLux Logo"
              className="w-10 h-10 object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span className="text-foreground whitespace-nowrap hidden sm:inline-block">
              Microsoft Teams 
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary transition font-medium text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-2">
          {toggleTheme && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-foreground" title={theme === 'light' ? '切換深色模式' : '切換淺色模式'}>
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
          )}

          <button className="lg:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block font-semibold text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
