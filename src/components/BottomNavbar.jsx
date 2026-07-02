import { useState, useEffect, useRef } from 'react';
import {
  Menu,
  PhoneCall,
  Contact,
  Search,
  Sun,
  Moon,
  Bell,
  CircleCheck,
  CircleUserRound,
  CircleDollarSign,
  Settings,
  LogOut,
  Pencil,
  Bug,
  Target,
  ShoppingBasket,
  MessageSquare,
  Inbox,
  X,
  Clock,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const notificationsData = [
  { id: 1, title: 'New sales order received', time: '10 minutes ago', type: 'sales', unread: true },
  { id: 2, title: 'New user account registered', time: '23 minutes ago', type: 'user', unread: true },
  { id: 3, title: 'New product review received', time: '48 minutes ago', type: 'review', unread: true },
  { id: 4, title: 'New product review received', time: '50 minutes ago', type: 'review', unread: true },
  { id: 5, title: 'New sales order received', time: '55 minutes ago', type: 'sales', unread: true },
  { id: 6, title: 'New issue filed by customer', time: '2 hours ago', type: 'issue', unread: true },
  { id: 7, title: 'Thread responded and closed', time: '5 hours ago', type: 'thread', unread: true },
  { id: 8, title: 'Review unpaid orders', time: '2 hours ago', type: 'orders', unread: false },
  { id: 9, title: 'New comment received', time: '3 hours ago', type: 'comment', unread: false },
  { id: 10, title: 'Thread re-opened by administrator', time: '6 hours ago', type: 'thread', unread: false },
];

const recentSearches = [
  'Client feedback',
  'Weekly report',
  'Q3 targets',
  'Meeting notes',
];

export default function BottomNavbar({ onHamburgerClick, sidebarOpen }) {
  const { theme, toggleTheme } = useTheme();
  const isSun = theme === 'dark';

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifDropdownRef = useRef(null);
  const notifButtonRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const profileButtonRef = useRef(null);
  const searchDropdownRef = useRef(null);
  const searchButtonRef = useRef(null);

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isNotifOpen &&
        notifDropdownRef.current &&
        !notifDropdownRef.current.contains(event.target) &&
        notifButtonRef.current &&
        !notifButtonRef.current.contains(event.target)
      ) {
        setIsNotifOpen(false);
      }
      if (
        isProfileOpen &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
      if (
        isSearchOpen &&
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotifOpen, isProfileOpen, isSearchOpen]);

  return (
    <nav
      id="bottom-navbar"
      className="fixed bottom-0 left-0 right-0 z-[55] flex items-center justify-around"
      style={{
        height: '54px',
        background: 'var(--sidebar-navbar-bg)',
        borderTop: '1px solid var(--main-border)',
      }}
    >
      {/* Hamburger */}
      <button
        id="bottom-nav-hamburger"
        onClick={onHamburgerClick}
        className="flex items-center justify-center rounded-[10px] text-[var(--navbar-btn-text)] hover:bg-[var(--navbar-btn-hover-bg)] hover:text-[var(--navbar-btn-hover-text)] transition-all duration-300 cursor-pointer"
        style={{ width: '44px', height: '44px' }}
        title="Menu"
      >
        <Menu size={22} strokeWidth={2} />
      </button>

      {/* Dark/Light Mode Toggle */}
      <button
        id="bottom-nav-theme"
        onClick={toggleTheme}
        className="flex items-center justify-center rounded-[10px] text-[var(--navbar-btn-text)] hover:bg-[var(--navbar-btn-hover-bg)] hover:text-[var(--navbar-btn-hover-text)] hover:shadow-[var(--navbar-btn-hover-shadow)] transition-all duration-300 cursor-pointer"
        style={{ width: '44px', height: '44px' }}
        title={isSun ? 'Light Mode' : 'Dark Mode'}
      >
        {isSun ? (
          <Sun size={21} strokeWidth={2} className="transition-all duration-200" />
        ) : (
          <Moon size={21} strokeWidth={2} className="transition-all duration-200" />
        )}
      </button>

      {/* Notifications - with ping animation + dropdown */}
      <div className="relative">
        <button
          ref={notifButtonRef}
          id="bottom-nav-notifications"
          onClick={() => setIsNotifOpen((prev) => !prev)}
          className="relative flex items-center justify-center text-[var(--navbar-btn-text)] transition-all duration-300 cursor-pointer hover:bg-[var(--navbar-btn-hover-bg)] hover:text-[var(--navbar-btn-hover-text)] hover:shadow-[var(--navbar-btn-hover-shadow)] rounded-[10px]"
          style={{ width: '44px', height: '44px' }}
          title={isNotifOpen ? '' : 'Notifications'}
        >
          <span className="animate-ping absolute inline-flex h-[24px] w-[24px] rounded-full bg-red-500/30 opacity-75"></span>
          <Bell
            size={21}
            strokeWidth={isNotifOpen ? 2.5 : 2}
            className="relative z-10 transition-all duration-200"
          />
        </button>

        {/* Notification Dropdown - opens upward */}
        {isNotifOpen && (
          <div
            ref={notifDropdownRef}
            className="notification-dropdown absolute z-50 select-none"
            style={{
              bottom: '52px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(320px, 90vw)',
            }}
          >
            <div className="notification-dropdown-header">
              <span className="notification-dropdown-title">Notifications</span>
              <div className="notification-dropdown-actions">
                <button className="notification-dropdown-action border-none bg-transparent outline-none">
                  <CircleCheck size={18} />
                </button>
                <button className="notification-dropdown-action border-none bg-transparent outline-none">
                  <Inbox size={18} />
                </button>
                <button className="notification-dropdown-action border-none bg-transparent outline-none">
                  <Settings size={18} />
                </button>
              </div>
            </div>

            <div className="notification-list">
              {notificationsData.map((notif) => {
                let IconComponent = CircleUserRound;
                let circleBg = '#10b981';

                if (notif.type === 'sales') {
                  IconComponent = CircleDollarSign;
                  circleBg = '#10b981';
                } else if (notif.type === 'user') {
                  IconComponent = CircleUserRound;
                  circleBg = '#10b981';
                } else if (notif.type === 'review') {
                  IconComponent = Pencil;
                  circleBg = '#3b82f6';
                } else if (notif.type === 'issue') {
                  IconComponent = Bug;
                  circleBg = '#ef4444';
                } else if (notif.type === 'thread') {
                  IconComponent = Target;
                  circleBg = '#06b6d4';
                } else if (notif.type === 'orders') {
                  IconComponent = ShoppingBasket;
                  circleBg = '#f97316';
                } else if (notif.type === 'comment') {
                  IconComponent = MessageSquare;
                  circleBg = '#06b6d4';
                }

                return (
                  <button
                    key={notif.id}
                    className="notification-item"
                    onClick={() => setIsNotifOpen(false)}
                  >
                    <div
                      className="notification-circle"
                      style={{ backgroundColor: circleBg }}
                    >
                      <IconComponent size={18} />
                    </div>
                    <div className="notification-content">
                      <p className="notification-item-title">{notif.title}</p>
                      <span className="notification-item-time">{notif.time}</span>
                    </div>
                    {notif.unread && <div className="notification-dot" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Search with dropdown */}
      <div className="relative">
        <button
          ref={searchButtonRef}
          id="bottom-nav-search"
          onClick={() => setIsSearchOpen((prev) => !prev)}
          className="relative flex items-center justify-center rounded-[10px] text-[var(--navbar-btn-text)] hover:bg-[var(--navbar-btn-hover-bg)] hover:text-[var(--navbar-btn-hover-text)] transition-all duration-300 cursor-pointer"
          style={{ width: '44px', height: '44px' }}
          title={isSearchOpen ? '' : 'Search'}
        >
          <Search size={21} strokeWidth={isSearchOpen ? 2.5 : 2} className="transition-all duration-200" />
        </button>

        {/* Search Dropdown - opens upward */}
        {isSearchOpen && (
          <div
            ref={searchDropdownRef}
            className="notification-dropdown absolute z-50 select-none"
            style={{
              bottom: '52px',
              left: '50%',
              transform: 'translateX(-75%)',
              width: 'min(320px, 90vw)',
            }}
          >
            <div className="notification-dropdown-header">
              <span className="notification-dropdown-title">Search</span>
              <div className="notification-dropdown-actions">
                <button className="notification-dropdown-action border-none bg-transparent outline-none cursor-pointer">
                  <Settings size={18} />
                </button>
              </div>
            </div>

            <div className="search-dropdown-input-wrapper">
              <Search size={16} className="search-dropdown-icon flex-shrink-0" />
              <input
                type="text"
                placeholder="Type a keyword..."
                className="search-dropdown-input"
                autoFocus
              />
            </div>

            <div>
              <div className="search-dropdown-section-title">Recent Searches</div>
              <div className="search-dropdown-list">
                {recentSearches.map((searchQuery, idx) => (
                  <button
                    key={idx}
                    className="search-dropdown-item"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <Clock size={16} className="search-dropdown-icon flex-shrink-0" />
                    <span>{searchQuery}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Avatar with dropdown */}
      <div className="relative">
        <button
          ref={profileButtonRef}
          id="bottom-nav-avatar"
          onClick={() => setIsProfileOpen((prev) => !prev)}
          className="flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer hover:bg-[var(--navbar-btn-hover-bg)]"
          style={{
            width: '40px',
            height: '40px',
          }}
          title={isProfileOpen ? '' : 'Profile'}
        >
          <img
            src="/avatar.png"
            alt="User"
            className="rounded-full object-cover"
            style={{
              width: '32px',
              height: '32px',
              border: '2px solid var(--main-border)',
            }}
          />
        </button>

        {/* Profile Dropdown - opens upward */}
        {isProfileOpen && (
          <div
            ref={profileDropdownRef}
            className="profile-dropdown absolute z-50 select-none"
            style={{
              bottom: '52px',
              right: '0',
            }}
          >
            <button
              className="profile-dropdown-item"
              onClick={() => setIsProfileOpen(false)}
            >
              <CircleUserRound size={18} className="profile-dropdown-icon flex-shrink-0" />
              <span>Profile</span>
            </button>
            <button
              className="profile-dropdown-item"
              onClick={() => setIsProfileOpen(false)}
            >
              <CircleDollarSign size={18} className="profile-dropdown-icon flex-shrink-0" />
              <span>Billing</span>
            </button>
            <button
              className="profile-dropdown-item"
              onClick={() => setIsProfileOpen(false)}
            >
              <Settings size={18} className="profile-dropdown-icon flex-shrink-0" />
              <span>Preferences</span>
            </button>
            <button
              className="profile-dropdown-item"
              onClick={() => setIsProfileOpen(false)}
            >
              <LogOut size={18} className="profile-dropdown-icon flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
