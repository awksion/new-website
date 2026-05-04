import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';

const navLinks = [
  { label: 'Artist Playbook', to: '/artist-playbook' },
  { label: 'Venues', to: '/venue-intelligence' },
  { label: 'Waitlist', to: '/waitlist' },
];

const scannerTexts = ['SCANNING NETWORK...', 'CONNECTION FAILED.', 'NO MATCHING AWKSIONS FOUND.'];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between h-16">
        {/* Logo — bold #B4FF00 button */}
        <Link
          to="/"
          className="flex-shrink-0 bg-[#B4FF00] text-black font-black text-sm px-4 py-1.5 rounded-md tracking-tight hover:bg-[#c8ff33] transition-colors"
        >
          awksion
        </Link>

        {/* Desktop Nav — centered */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors duration-200 hover:text-foreground ${
                location.pathname === link.to ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link to="/waitlist" className="hidden md:inline-flex btn-neon text-xs px-4 py-2">
            Join Waitlist
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground cursor-pointer"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <nav className="section-container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/waitlist" className="btn-neon text-xs px-4 py-2 w-fit">
              Join Waitlist
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
