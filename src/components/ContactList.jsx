import { useState } from 'react';
import { SortAsc, Menu } from 'lucide-react';
import ContactAvatar from './ContactAvatar';

export default function ContactList({ contacts, selectedId, onSelect, isMobile = false, onMenuClick }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-col p-6">
      <div 
        className="mb-[14px] flex h-[22px] items-center justify-between px-[2px]"
        style={{ marginTop: isMobile ? '12px' : '0' }}
      >
        {isMobile ? (
          <div className="flex items-center gap-[12px]">
            <button onClick={onMenuClick} className="cursor-pointer flex items-center justify-center hover:opacity-80 transition-opacity" title="Menu">
              <Menu size={20} strokeWidth={2} color="var(--contact-item-title)" style={{ marginBottom: '20px' }} />
            </button>
            <h2 className="text-[14px] font-medium text-[var(--contact-item-title)]"
              style={{
                marginBottom: '20px'
              }}
            >All Contacts</h2>
          </div>
        ) : (
          <h2 className="text-[14px] font-medium text-[var(--contact-item-title)]"
            style={{
              marginBottom: '20px'
            }}
          >All Contacts</h2>
        )}
        <button
          className="flex h-[24px] w-[24px] items-center justify-center rounded-full transition-colors hover:bg-white/35"
          title="Sort contacts"
        >
          <SortAsc size={16} strokeWidth={2} color="var(--contact-item-title)"
            style={{
              marginBottom: '20px'
            }}
          />
        </button>
      </div>
      <div className="contact-workspace-scroll min-h-0 flex-1 overflow-y-auto pr-[8px]">
        <div className="space-y-[10px]">
          {contacts.map((contact) => {
            const isSelected = contact.id === selectedId;

            return (
              <button
                key={contact.id}
                onClick={() => onSelect(contact)}
                onMouseEnter={() => setHoveredId(contact.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="flex h-[64px] w-full items-center gap-[14px] rounded-[6px] px-[12px] text-left transition-colors duration-200"
                style={{
                  background: isSelected 
                    ? 'var(--contact-item-selected-bg)' 
                    : (hoveredId === contact.id ? 'var(--contact-item-hover-bg)' : 'transparent'),
                  padding: '8px 10px',
                  cursor: 'pointer',
                }}
              >
                <ContactAvatar contact={contact} />
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-medium text-[var(--contact-item-name)]">
                    {contact.name}
                  </span>
                  <span className="mt-[7px] block truncate text-[11px] font-medium text-[var(--contact-item-email)]">
                    {contact.email}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
