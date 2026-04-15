import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from "../contexts/ThemeContext";
import TeamsLogo from '../assets/Teams-Logo.png';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { href: "/introduction", label: "入門指南" },
    { href: "/concepts/core", label: "核心概念" },
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
              src={TeamsLogo}
              alt="Microsoft Teams Logo"
              className="w-10 h-10 object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="flex items-center gap-1">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <rect width="28" height="28" rx="6" fill="#5B5EA6"/>
                <path d="M8 8.5C8 7.67 8.67 7 9.5 7H13C14.38 7 15.5 8.12 15.5 9.5V13C15.5 14.38 14.38 15.5 13 15.5H9.5C8.67 15.5 8 14.83 8 14V8.5Z" fill="white"/>
                <path d="M18 12.5C18 11.67 18.67 11 19.5 11H20.5C22.54 11 24.17 12.63 24.17 14.67C24.17 16.71 22.54 18.33 20.5 18.33H19.5C18.67 18.33 18 17.67 18 16.83V12.5Z" fill="#E8E6F5"/>
                <path d="M7.83 12.5C7.83 11.67 8.5 11 9.33 11H10.33C12.37 11 14 12.63 14 14.67C14 16.71 12.37 18.33 10.33 18.33H9.33C8.5 18.33 7.83 17.67 7.83 16.83V12.5Z" fill="#E8E6F5"/>
                <path d="M8 18.5C8 19.33 8.67 20 9.5 20H13C14.38 20 15.5 18.88 15.5 17.5V16.33C15.5 15.6 14.93 15 14.2 15H13C11.62 15 10.5 13.88 10.5 12.5V11.33C10.5 10.6 9.93 10 9.2 10H9.5C8.67 10 8 10.67 8 11.5V18.5Z" fill="#7B79C4"/>
              </svg>
              <span className="text-foreground whitespace-nowrap hidden sm:inline-block">Microsoft Teams 教學</span>
            </div>
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
