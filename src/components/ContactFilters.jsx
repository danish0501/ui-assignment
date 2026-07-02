import { useState } from 'react';
import { filterSections } from '../data/contactData';

export default function ContactFilters({ isMobile = false, isOpen = false }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);

  const content = (
    <section className={`flex h-full min-h-0 min-w-0 flex-col ${!isMobile ? 'p-6' : ''}`}
      style={isMobile ? { padding: "12px" } : {}}
    >
      {/* First Section Title stays fixed at the top */}
      <div className="mb-[10px] px-[8px]">
        <p className="text-[12px] font-medium text-[var(--text-muted)]">
          {filterSections[0].title}
        </p>
      </div>

      <div className="contact-workspace-scroll min-h-0 flex-1 overflow-y-auto pr-[8px]">
        {/* Render First Section Items */}
        <div className="mb-[30px] space-y-[2px]">
          {filterSections[0].items.map((item) => {
            const isActive = activeFilter === item.id;
            const Icon = item.Icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveFilter(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="flex h-[36px] w-full items-center gap-[12px] rounded-[6px] px-[10px] text-left transition-colors duration-200"
                style={{
                  background: isActive
                    ? 'var(--filter-btn-active-bg)'
                    : (hoveredId === item.id ? 'var(--filter-btn-hover-bg)' : 'transparent'),
                  color: 'var(--filter-btn-text)',
                  padding: '8px 10px',
                  cursor: 'pointer',
                }}
              // title={item.label}
              >
                <Icon size={16} strokeWidth={1.9} color={item.color ?? 'var(--filter-btn-text)'} />
                <span className="truncate text-[14px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Render Remaining Sections */}
        {filterSections.slice(1).map((section) => (
          <div key={section.title} className="mb-[30px]">
            <p className="mb-[10px] px-[8px] text-[12px] font-medium text-[var(--text-muted)]"
              style={{
                marginBottom: '5px',
                marginTop: '20px'
              }}
            >
              {section.title}
            </p>
            <div className="space-y-[2px]">
              {section.items.map((item) => {
                const isActive = activeFilter === item.id;
                const Icon = item.Icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveFilter(item.id)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="flex h-[36px] w-full items-center gap-[12px] rounded-[6px] px-[10px] text-left transition-colors duration-200"
                    style={{
                      background: isActive
                        ? 'var(--filter-btn-active-bg)'
                        : (hoveredId === item.id ? 'var(--filter-btn-hover-bg)' : 'transparent'),
                      color: 'var(--filter-btn-text)',
                      padding: '8px 10px',
                      cursor: 'pointer',
                    }}
                    title={item.label}
                  >
                    <Icon size={16} strokeWidth={1.9} color={item.color ?? 'var(--filter-btn-text)'} />
                    <span className="truncate text-[14px] font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  if (isMobile) {
    return (
      <aside
        className={`fixed left-0 top-0 bottom-[54px] z-[60] flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          width: '280px',
          background: 'var(--search-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRight: '1px solid var(--search-border)',
          borderRadius: '0 24px 24px 0',
          boxShadow: isOpen ? '10px 0 30px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        {content}
      </aside>
    );
  }

  return content;
}
