import { useState, useEffect, useRef } from 'react';
import {
  Search,
  CircleCheck,
  Moon,
  Sun,
  Bell,
  CircleUserRound,
  CircleDollarSign,
  Settings,
  LogOut,
  Clock,
  Bug,
  Pencil,
  Target,
  ShoppingBasket,
  MessageSquare,
  Inbox,
  Circle,
  Check,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const rightIconsTop = [
  { id: 'avatar', label: 'Profile', type: 'avatar' },
  { id: 'language', label: 'Language', type: 'flag' },
  { id: 'search', label: 'Search', Icon: Search },
  { id: 'notifications', label: 'Notifications' },
  { id: 'tasks', label: 'Tasks', Icon: CircleCheck },
  { id: 'light-mode', label: 'Light Mode' },
];

const recentSearches = [
  'Configuration Management Reports',
  'User Activity Log',
  'Performance Insights',
  'Access Control Setup',
  'Data Visualization',
  'System Health Check',
  'Security Reports',
  'User Analytics View',
  'Activity Monitoring',
  'Error Tracking Log',
];

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

const tasksData = [
  { id: 1, title: 'Mollit sint ad exercitation ullamco elit ve...', label: 'bug', date: '21-03-2030', priority: '!!!', completed: false },
  { id: 2, title: 'Ipsum sint dolore voluptate ea ex dolore ...', label: 'documentation', date: '27-02-2030', priority: '!!!', completed: false },
  { id: 3, title: 'In tempor aliqua dolor nulla magna nulla...', label: 'feature', date: '28-03-2030', priority: '!!!', completed: false },
  { id: 4, title: 'Deserunt nisi dolore duis occaecat velit ...', label: 'bug', date: null, priority: '!', completed: false },
  { id: 5, title: 'Labore fugiat laboris veniam aliqua anim...', label: 'discussion', date: null, priority: '!!', completed: false },
  { id: 6, title: 'Voluptate in est dolor voluptate fugiat eli...', label: 'feature', date: '26-03-2030', priority: '!', completed: false },
  { id: 7, title: 'Est commodo veniam irure eu pariatur n...', label: 'feature', date: '31-03-2030', priority: '!!!', completed: false },
  { id: 8, title: 'Tempor aliquip eu in consequat esse ex.', label: 'documentation', date: '07-03-2030', priority: '!!!', completed: false },
  { id: 9, title: 'Duis nostrud ea aliqua proident adipisici...', label: 'design', date: null, priority: '!!', completed: false },
  { id: 10, title: 'Incididunt incididunt incididunt dolore co...', label: 'design', date: '23-03-2030', priority: '!!', completed: false },
];

export default function RightSidebar() {
  const [activeId, setActiveId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isTasksOpen, setIsTasksOpen] = useState(false);
  const [tasks, setTasks] = useState(tasksData);
  const { theme, toggleTheme } = useTheme();
  const isSun = theme === 'dark';

  const dropdownRef = useRef(null);
  const avatarButtonRef = useRef(null);
  const langDropdownRef = useRef(null);
  const langButtonRef = useRef(null);
  const searchDropdownRef = useRef(null);
  const searchButtonRef = useRef(null);
  const notifDropdownRef = useRef(null);
  const notifButtonRef = useRef(null);
  const tasksDropdownRef = useRef(null);
  const tasksButtonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarButtonRef.current &&
        !avatarButtonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }

      if (
        isLangOpen &&
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target) &&
        langButtonRef.current &&
        !langButtonRef.current.contains(event.target)
      ) {
        setIsLangOpen(false);
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
        isTasksOpen &&
        tasksDropdownRef.current &&
        !tasksDropdownRef.current.contains(event.target) &&
        tasksButtonRef.current &&
        !tasksButtonRef.current.contains(event.target)
      ) {
        setIsTasksOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, isLangOpen, isSearchOpen, isNotifOpen, isTasksOpen]);

  return (
    <aside
      id="right-sidebar"
      className="fixed right-0 top-0 bottom-0 z-50 flex flex-col items-center"
      style={{
        width: '62px',
        background: 'var(--sidebar-navbar-bg)',
      }}
    >
      <div
        className="flex flex-col items-center gap-4"
        style={{ paddingTop: '14px' }}
      >
        {rightIconsTop.map((item) => {
          const isActive = activeId === item.id;

          if (item.type === 'avatar') {
            return (
              <div key={item.id} className="relative">
                <button
                  ref={avatarButtonRef}
                  id={`right-icon-${item.id}`}
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className={`relative flex items-center justify-center text-[var(--navbar-btn-text)] transition-all duration-300 cursor-pointer group hover:bg-[var(--navbar-btn-hover-bg)] hover:text-[var(--navbar-btn-hover-text)] hover:shadow-[var(--navbar-btn-hover-shadow)] rounded-full`}
                  style={{
                    width: '40px',
                    height: '40px',
                  }}
                  title={isDropdownOpen ? '' : item.label}
                >
                  <img
                    src="/avatar.png"
                    alt="User"
                    className="rounded-full object-cover"
                    style={{
                      width: '30px',
                      height: '30px',
                      border: '2px solid var(--main-border)',
                    }}
                  />
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="profile-dropdown absolute right-0 top-[46px] z-50 select-none"
                  >
                    <button
                      className="profile-dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <CircleUserRound size={18} className="profile-dropdown-icon flex-shrink-0" />
                      <span>Profile</span>
                    </button>
                    <button
                      className="profile-dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <CircleDollarSign size={18} className="profile-dropdown-icon flex-shrink-0" />
                      <span>Billing</span>
                    </button>
                    <button
                      className="profile-dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings size={18} className="profile-dropdown-icon flex-shrink-0" />
                      <span>Preferences</span>
                    </button>
                    <button
                      className="profile-dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <LogOut size={18} className="profile-dropdown-icon flex-shrink-0" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            );
          }

          if (item.type === 'flag') {
            return (
              <div key={item.id} className="relative">
                <button
                  ref={langButtonRef}
                  id={`right-icon-${item.id}`}
                  onClick={() => setIsLangOpen((prev) => !prev)}
                  className={`relative flex items-center justify-center text-[var(--navbar-btn-text)] transition-all duration-300 cursor-pointer group hover:bg-[var(--navbar-btn-hover-bg)] hover:text-[var(--navbar-btn-hover-text)] hover:shadow-[var(--navbar-btn-hover-shadow)] rounded-[10px]`}
                  style={{
                    width: '40px',
                    height: '40px',
                  }}
                  title={isLangOpen ? '' : item.label}
                >
                  <div
                    className="rounded-full overflow-hidden flex items-center justify-center"
                    style={{ width: '28px', height: '28px' }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28">
                      <clipPath id="flagClip">
                        <circle cx="14" cy="14" r="14" />
                      </clipPath>
                      <g clipPath="url(#flagClip)">
                        <rect width="28" height="28" fill="#003078" />
                        <path d="M0 0L28 28M28 0L0 28" stroke="white" strokeWidth="4" />
                        <path d="M0 0L28 28M28 0L0 28" stroke="#C8102E" strokeWidth="2" />
                        <rect x="11" y="0" width="6" height="28" fill="white" />
                        <rect x="0" y="11" width="28" height="6" fill="white" />
                        <rect x="12" y="0" width="4" height="28" fill="#C8102E" />
                        <rect x="0" y="12" width="28" height="4" fill="#C8102E" />
                      </g>
                    </svg>
                  </div>
                </button>
                {isLangOpen && (
                  <div
                    ref={langDropdownRef}
                    className="profile-dropdown absolute right-0 top-[46px] z-50 select-none"
                  >
                    <button
                      className="profile-dropdown-item"
                      onClick={() => setIsLangOpen(false)}
                    >
                      <div className="w-[24px] h-[24px] rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.75" />
                          <circle cx="12" cy="12" r="5.5" fill="#ff0038" />
                        </svg>
                      </div>
                      <span>Japanese</span>
                    </button>
                    <button
                      className="profile-dropdown-item"
                      onClick={() => setIsLangOpen(false)}
                    >
                      <div className="w-[24px] h-[24px] rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <clipPath id="germanyClip">
                            <circle cx="12" cy="12" r="12" />
                          </clipPath>
                          <g clipPath="url(#germanyClip)">
                            <rect x="0" y="0" width="24" height="8" fill="#000000" />
                            <rect x="0" y="8" width="24" height="8" fill="#dd0000" />
                            <rect x="0" y="16" width="24" height="8" fill="#ffce00" />
                          </g>
                        </svg>
                      </div>
                      <span>German</span>
                    </button>
                    <button
                      className="profile-dropdown-item"
                      onClick={() => setIsLangOpen(false)}
                    >
                      <div className="w-[24px] h-[24px] rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <clipPath id="chinaClip">
                            <circle cx="12" cy="12" r="12" />
                          </clipPath>
                          <g clipPath="url(#chinaClip)">
                            <rect width="24" height="24" fill="#ee1c25" />
                            <path d="M6 3l1 2.2h2.3l-1.8 1.4.7 2.2-1.9-1.4-1.9 1.4.7-2.2-1.8-1.4h2.3z" fill="#ffff00" />
                            <path d="M10.5 2.5l.3.7h.8l-.6.5.2.7-.7-.5-.7.5.2-.7-.6-.5h.8z" fill="#ffff00" />
                            <path d="M12 4.2l.3.7h.8l-.6.5.2.7-.7-.5-.7.5.2-.7-.6-.5h.8z" fill="#ffff00" />
                            <path d="M12 6.5l.3.7h.8l-.6.5.2.7-.7-.5-.7.5.2-.7-.6-.5h.8z" fill="#ffff00" />
                            <path d="M10.5 8.2l.3.7h.8l-.6.5.2.7-.7-.5-.7.5.2-.7-.6-.5h.8z" fill="#ffff00" />
                          </g>
                        </svg>
                      </div>
                      <span>Chinese</span>
                    </button>
                    <button
                      className="profile-dropdown-item"
                      onClick={() => setIsLangOpen(false)}
                    >
                      <div className="w-[24px] h-[24px] rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <clipPath id="franceClip">
                            <circle cx="12" cy="12" r="12" />
                          </clipPath>
                          <g clipPath="url(#franceClip)">
                            <rect x="0" y="0" width="8" height="24" fill="#002395" />
                            <rect x="8" y="0" width="8" height="24" fill="#ffffff" />
                            <rect x="16" y="0" width="8" height="24" fill="#ed2939" />
                          </g>
                        </svg>
                      </div>
                      <span>French</span>
                    </button>
                  </div>
                )}
              </div>
            );
          }

          if (item.id === 'search') {
            return (
              <div key={item.id} className="relative">
                <button
                  ref={searchButtonRef}
                  id={`right-icon-${item.id}`}
                  onClick={() => setIsSearchOpen((prev) => !prev)}
                  className={`relative flex items-center justify-center text-[var(--navbar-btn-text)] transition-all duration-300 cursor-pointer group hover:bg-[var(--navbar-btn-hover-bg)] hover:text-[var(--navbar-btn-hover-text)] hover:shadow-[var(--navbar-btn-hover-shadow)] rounded-[10px]`}
                  style={{
                    width: '40px',
                    height: '40px',
                  }}
                  title={isSearchOpen ? '' : item.label}
                >
                  <Search
                    size={19}
                    strokeWidth={isSearchOpen ? 2.5 : 2}
                    className="transition-all duration-200"
                  />
                </button>
                {isSearchOpen && (
                  <div
                    ref={searchDropdownRef}
                    className="search-dropdown absolute right-[48px] top-[-100px] z-50 select-none"
                  >
                    <div className="search-dropdown-header">
                      <span className="search-dropdown-title">Search</span>
                      <button className="search-dropdown-settings border-none bg-transparent outline-none">
                        <Settings size={18} />
                      </button>
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
            );
          }

          if (item.id === 'notifications') {
            return (
              <div key={item.id} className="relative">
                <button
                  ref={notifButtonRef}
                  id={`right-icon-${item.id}`}
                  onClick={() => setIsNotifOpen((prev) => !prev)}
                  className={`relative flex items-center justify-center text-[var(--navbar-btn-text)] transition-all duration-300 cursor-pointer group hover:bg-[var(--navbar-btn-hover-bg)] hover:text-[var(--navbar-btn-hover-text)] hover:shadow-[var(--navbar-btn-hover-shadow)] rounded-[10px]`}
                  style={{
                    width: '40px',
                    height: '40px',
                  }}
                  title={isNotifOpen ? '' : item.label}
                >
                  <span className="animate-ping absolute inline-flex h-[24px] w-[24px] rounded-full bg-red-500/30 opacity-75"></span>
                  <Bell
                    size={19}
                    strokeWidth={isNotifOpen ? 2.5 : 2}
                    className="relative z-10 transition-all duration-200"
                  />
                </button>
                {isNotifOpen && (
                  <div
                    ref={notifDropdownRef}
                    className="notification-dropdown absolute right-[48px] top-[-160px] z-50 select-none"
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
            );
          }

          if (item.id === 'tasks') {
            return (
              <div key={item.id} className="relative">
                <button
                  ref={tasksButtonRef}
                  id={`right-icon-${item.id}`}
                  onClick={() => setIsTasksOpen((prev) => !prev)}
                  className={`relative flex items-center justify-center text-[var(--navbar-btn-text)] transition-all duration-300 cursor-pointer group hover:bg-[var(--navbar-btn-hover-bg)] hover:text-[var(--navbar-btn-hover-text)] hover:shadow-[var(--navbar-btn-hover-shadow)] rounded-[10px]`}
                  style={{
                    width: '40px',
                    height: '40px',
                  }}
                  title={isTasksOpen ? '' : item.label}
                >
                  <CircleCheck
                    size={19}
                    strokeWidth={isTasksOpen ? 2.5 : 2}
                    className="transition-all duration-200"
                  />
                </button>
                {isTasksOpen && (
                  <div
                    ref={tasksDropdownRef}
                    className="tasks-dropdown absolute right-[48px] top-[-220px] z-50 select-none"
                  >
                    <div className="tasks-dropdown-header">
                      <span className="tasks-dropdown-title">Tasks</span>
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

                    <div className="tasks-list">
                      {tasks.map((task, index) => (
                        <div key={task.id} className="w-full">
                          <button
                            className="task-item"
                            onClick={() => {
                              setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
                            }}
                          >
                            {task.completed ? (
                              <div
                                className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{
                                  backgroundColor: 'var(--dropdown-icon)',
                                  border: '1px solid var(--dropdown-icon)',
                                  color: '#ffffff',
                                }}
                              >
                                <Check size={11} strokeWidth={3.5} />
                              </div>
                            ) : (
                              <Circle size={18} className="task-checkbox-icon" />
                            )}
                            <div className="task-content">
                              <p className="task-item-title">{task.title}</p>
                              <div className="task-meta">
                                <span className={`task-badge ${task.label === 'documentation' ? 'documentation' : task.label}`}>
                                  {task.label}
                                </span>
                                <span>-</span>
                                {task.date && (
                                  <>
                                    <span>{task.date}</span>
                                    <span>-</span>
                                  </>
                                )}
                                <span>{task.priority}</span>
                              </div>
                            </div>
                          </button>
                          {index < tasks.length - 1 && (
                            <div
                              style={{
                                height: '1px',
                                background: 'var(--dropdown-border)',
                                opacity: 0.8,
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={item.id}
              id={`right-icon-${item.id}`}
              onClick={() => {
                if (item.id === 'light-mode') {
                  toggleTheme();
                } else {
                  setActiveId(item.id);
                }
              }}
              className={`relative flex items-center justify-center text-[var(--navbar-btn-text)] transition-all duration-300 cursor-pointer group hover:bg-[var(--navbar-btn-hover-bg)] hover:text-[var(--navbar-btn-hover-text)] hover:shadow-[var(--navbar-btn-hover-shadow)] rounded-[10px]`}
              style={{
                width: '40px',
                height: '40px',
              }}
              title={item.id === 'light-mode' ? (isSun ? 'Light Mode' : 'Dark Mode') : item.label}
            >
              {item.id === 'light-mode' ? (
                isSun ? (
                  <Sun
                    size={19}
                    strokeWidth={isActive ? 2.5 : 2}
                    className="transition-all duration-200"
                  />
                ) : (
                  <Moon
                    size={19}
                    strokeWidth={isActive ? 2.5 : 2}
                    className="transition-all duration-200"
                  />
                )
              ) : (
                <item.Icon
                  size={19}
                  strokeWidth={isActive ? 2.5 : 2}
                  className="transition-all duration-200"
                />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
