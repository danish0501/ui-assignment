import { useState } from 'react';
import {
  Search,
  Info,
  Settings,
  CircleEllipsis,
  Plus,
  X,
} from 'lucide-react';

export default function Navbar({ title }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav
      id="navbar"
      className="fixed top-0 z-40 flex items-center justify-between"
      style={{
        left: '62px',
        right: '62px',
        height: '64px',
        padding: '0 20px',
        background: 'var(--sidebar-navbar-bg)',
      }}
    >
      {/* Left section: Title */}
      <div className="flex items-center gap-[34px]">
        <h1
          className="font-semibold"
          style={{
            fontSize: '14px',
            color: 'var(--text-nav-title)',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h1>

        {/* Search bar */}
        <div
          className="flex items-center rounded-full"
          style={{
            width: '385px',
            height: '40px',
            padding: '0 16px',
            background: 'var(--search-bg)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid var(--search-border)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 2px 8px rgba(42, 138, 154, 0.04)',
            gap: '10px',
          }}
        >
          <Search size={17} color="var(--search-placeholder)" strokeWidth={2} className="flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Contacts..."
            className="flex-1 h-full bg-transparent border-none outline-none pr-3 text-[12px] font-medium placeholder-[var(--search-placeholder)]"
            style={{
              color: 'var(--search-text)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="flex items-center justify-center p-1 rounded-full hover:bg-black/5 cursor-pointer mr-2 flex-shrink-0"
              title="Clear search"
            >
              <X size={14} color="var(--search-text)" strokeWidth={2.5} />
            </button>
          )}
          <span
            className="select-none flex-shrink-0"
            style={{
              fontSize: '10px',
              color: 'var(--search-text)',
              fontWeight: 500,
            }}
          >
            Ctrl K
          </span>
        </div>
      </div>

      {/* Right section: Action icons + Create button */}
      <div className="flex items-center gap-[10px]">
        {/* Info icon */}
        <button
          id="navbar-info"
          className="flex items-center justify-center rounded-[10px] text-[var(--navbar-btn-text)] hover:bg-[var(--navbar-btn-hover-bg)] hover:text-[var(--navbar-btn-hover-text)] hover:shadow-[var(--navbar-btn-hover-shadow)] transition-all duration-300 cursor-pointer"
          style={{ width: '36px', height: '36px' }}
          title="Info"
        >
          <Info size={18} strokeWidth={2.25} />
        </button>

        {/* Settings icon */}
        <button
          id="navbar-settings"
          className="flex items-center justify-center rounded-[10px] text-[var(--navbar-btn-text)] hover:bg-[var(--navbar-btn-hover-bg)] hover:text-[var(--navbar-btn-hover-text)] hover:shadow-[var(--navbar-btn-hover-shadow)] transition-all duration-300 cursor-pointer"
          style={{ width: '36px', height: '36px' }}
          title="Settings"
        >
          <Settings size={18} strokeWidth={2.25} />
        </button>

        {/* Emoji icon */}
        <button
          id="navbar-emoji"
          className="flex items-center justify-center rounded-[10px] text-[var(--navbar-btn-text)] hover:bg-[var(--navbar-btn-hover-bg)] hover:text-[var(--navbar-btn-hover-text)] hover:shadow-[var(--navbar-btn-hover-shadow)] transition-all duration-300 cursor-pointer"
          style={{ width: '36px', height: '36px' }}
          title="Emoji"
        >
          <CircleEllipsis size={18} strokeWidth={2.25} />
        </button>

        {/* Create Contact button */}
        <button
          id="navbar-create-contact"
          className="ml-[14px] flex items-center justify-center gap-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-[var(--create-btn-hover-bg)] relative"
          style={{
            width: '142px',
            height: '36px',
            background: 'var(--create-btn-bg)',
            border: '1px solid var(--create-btn-border)',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--create-btn-text)',
          }}
        >
          <Plus size={16} strokeWidth={2} />
          Create Contact
        </button>
      </div>
    </nav>
  );
}
