import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

const scannerTexts = ['SCANNING NETWORK...', 'CONNECTION FAILED.', 'NO MATCHING AWKSIONS FOUND.'];

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scannerIndex, setScannerIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const interval = setInterval(() => {
      setScannerIndex((i) => (i + 1) % scannerTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [searchOpen]);

  useEffect(() => {
    setSearchOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between h-16">
        {/* Left spacer */}
        <div className="flex-1" />

        {/* Center — logo + waitlist */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="flex-shrink-0 bg-white/10 text-white font-semibold text-xs px-3 sm:px-4 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-colors tracking-tight"
          >
            awksion
          </Link>
          <Link
            to="/waitlist"
            className="flex-shrink-0 bg-white/10 text-white font-semibold text-xs px-3 sm:px-4 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-colors tracking-tight"
          >
            Waitlist
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex items-center justify-end gap-2 sm:gap-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" />
          </button>

        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-md">
          <div className="section-container py-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artists, cities, or tours..."
                className="w-full bg-secondary rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-cyan-500/50"
              />
              <p className="mt-2 text-xs text-cyan-400 font-mono tracking-wider">
                {scannerTexts[scannerIndex]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu — hidden since both buttons are always visible */}
    </header>
  );
}
