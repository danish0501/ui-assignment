import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Clipboard,
  Edit3,
  Mail,
  MapPin,
  MessageSquare,
  MinusCircle,
  Phone,
  Pointer,
  Smartphone,
  StickyNote
} from 'lucide-react';
import ContactAvatar from './ContactAvatar';

function DetailRow({ Icon, label, value, isNote = false }) {
  return (
    <div className="grid grid-cols-[48px_1fr_28px] items-start gap-[14px] border-b py-[14px] last:border-b-0"
      style={{
        padding: "20px",
        borderColor: "var(--details-row-border)"
      }}
    >
      <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full"
        style={{
          background: "var(--details-row-icon-bg)"
        }}
      >
        <Icon size={17} strokeWidth={1.75} color="var(--details-row-icon-color)" />
      </div>
      <div className="min-w-0 pt-[1px]">
        <p className="mb-[4px] text-[10px] font-medium text-[var(--details-row-label)]">{label}</p>
        <p
          className={`${isNote ? 'leading-[1.62]' : 'truncate'} text-[14px] font-medium text-[var(--details-row-value)]`}
        >
          {value}
        </p>
      </div>
      <button
        className="mt-[4px] flex h-[28px] w-[28px] items-center justify-center rounded-[6px] transition-colors hover:bg-[var(--details-copy-hover-bg)] cursor-pointer"
        title={`Copy ${label}`}
      >
        <Clipboard size={18} strokeWidth={1.8} color="var(--details-copy-icon-color)" />
      </button>
    </div>
  );
}

export default function ContactDetails({ contact, isMobile = false, onBack }) {
  const [hoveredButton, setHoveredButton] = useState(null);
  const detailRows = useMemo(
    () => [
      { label: 'Mobile Phone', value: contact.phone, Icon: Smartphone },
      { label: 'Home Phone', value: contact.home, Icon: Phone },
      { label: 'Email Address', value: contact.email, Icon: Mail },
      { label: 'Message', value: contact.message, Icon: MessageSquare },
      { label: 'Address', value: contact.address, Icon: MapPin },
      {
        label: 'Notes',
        value: contact.notes ?? 'No notes added for this contact.',
        Icon: StickyNote,
        isNote: true,
      },
    ],
    [contact],
  );

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-col p-6">
      <div className="mb-[30px] flex items-center justify-between gap-[20px]"
        style={{
          marginBottom: '10px'
        }}
      >
        {/* Back button - only on mobile */}
        {isMobile && onBack ? (
          <button
            onClick={onBack}
            className="flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[var(--details-btn-hover-bg)] rounded-[6px]"
            style={{
              padding: '8px',
            }}
          >
            <ArrowLeft size={20} strokeWidth={2} color="var(--details-btn-text)" />
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-[20px]">
          <button
            onMouseEnter={() => setHoveredButton('update')}
            onMouseLeave={() => setHoveredButton(null)}
            className="flex items-center gap-[7px] text-[14px] font-medium text-[var(--details-btn-text)]"
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              background: hoveredButton === 'update' ? 'var(--details-btn-hover-bg)' : 'transparent',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          >
            <Edit3 size={15} strokeWidth={1.9} />
            Update
          </button>
          <button
            onMouseEnter={() => setHoveredButton('delete')}
            onMouseLeave={() => setHoveredButton(null)}
            className="flex items-center gap-[7px] text-[14px] font-medium text-[var(--details-btn-text)]"
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              background: hoveredButton === 'delete' ? 'var(--details-btn-hover-bg)' : 'transparent',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          >
            <MinusCircle size={15} strokeWidth={1.9} />
            Delete
          </button>
        </div>
      </div>

      <div className="contact-workspace-scroll min-h-0 flex-1 overflow-y-auto pr-[10px]">
        <div className="rounded-[6px] p-[8px]"
          style={{
            background: 'var(--details-card-bg)'
          }}
        >
          <div className="flex h-[228px] flex-col items-center justify-center rounded-[4px]"
            style={{
              background: 'var(--details-header-bg)'
            }}
          >
            <ContactAvatar contact={contact} size={126} />
            <h3 className="mt-[14px] text-[14px] font-semibold text-[var(--details-name-text)]">
              {contact.name}
            </h3>
            <p className="mt-[10px] text-center text-[14px] font-medium text-[var(--details-role-text)]">
              {contact.role}
            </p>
          </div>
        </div>

        <div className="mt-[14px] px-[20px] pb-[18px] pt-[8px]"
          style={{
            background: 'var(--details-info-bg)'
          }}
        >
          {detailRows.map((row) => (
            <DetailRow key={row.label} {...row} />
          ))}
        </div>
      </div>
    </section>
  );
}
