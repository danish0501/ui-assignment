import logo from '../assets/logo.png';
import {
    ShoppingBag,
    IdCard,
    Globe,
    Kanban,
    AtSign,
    CircleUserRound,
    Folder,
    Contact,
    Mail,
    MessageSquare,
    CheckSquare,
    Calendar,
    Layout,
    Type,
    ClipboardList,
    Component,
    PieChart,
    ChevronRight
} from 'lucide-react';

const menuCategories = [
    {
        title: 'Dashboards',
        items: [
            { id: 'ecommerce', label: 'E-Commerce', Icon: ShoppingBag },
            { id: 'crm', label: 'CRM', Icon: IdCard },
            { id: 'analytics', label: 'Analytics', Icon: Globe },
            { id: 'project-management', label: 'Project Management', Icon: Kanban },
            { id: 'email-marketing', label: 'Email Marketing', Icon: AtSign },
        ]
    },
    {
        title: 'Application Views',
        items: [
            { id: 'user', label: 'User', Icon: CircleUserRound, hasSubmenu: true },
            { id: 'file-manager', label: 'File Manager', Icon: Folder },
            { id: 'contacts', label: 'Contacts', Icon: Contact },
            { id: 'mail', label: 'Mail', Icon: Mail },
            { id: 'messages', label: 'Messages', Icon: MessageSquare },
            { id: 'todo-lists', label: 'Todo Lists', Icon: CheckSquare },
            { id: 'calendar', label: 'Calendar', Icon: Calendar },
        ]
    },
    {
        title: 'Miscellaneous',
        items: [
            { id: 'sample-pages', label: 'Sample Pages', Icon: Layout, hasSubmenu: true },
            { id: 'content', label: 'Content', Icon: Type, hasSubmenu: true },
            { id: 'forms', label: 'Forms', Icon: ClipboardList },
            { id: 'components', label: 'Components', Icon: Component },
            { id: 'charts', label: 'Charts', Icon: PieChart },
        ]
    }
];

export default function LeftSidebar({ activeId, onSelect }) {
    return (
        <aside
            id="left-sidebar"
            className="fixed left-0 top-0 bottom-0 z-50 flex flex-col group w-[62px] hover:w-[260px] transition-[width] duration-300 ease-in-out"
            style={{
                background: 'var(--left-sidebar-bg)',
                borderRadius: '0 24px 24px 0',
            }}
        >
            {/* Brand Logo Header */}
            <div className="flex items-center gap-4 w-full h-[64px] flex-shrink-0" style={{ paddingLeft: '24px' }}>
                <div className="flex-shrink-0 flex items-center justify-center w-[24px] h-[24px]">
                    <img src={logo} alt="Linear Admin Logo" className="w-[20px] h-[20px] object-contain" />
                </div>
                <div
                    className="flex items-center whitespace-nowrap font-bold text-[18px] tracking-tight transition-all duration-300 select-none opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto"
                >
                    <span style={{ color: 'var(--left-sidebar-brand)' }}>Linear</span>
                    <span style={{ color: 'var(--left-sidebar-active)', marginLeft: '5px' }}>Admin</span>
                </div>
            </div>

            {/* Menu Categories List */}
            <div className="flex-1 overflow-y-hidden group-hover:overflow-y-auto overflow-x-hidden pt-2 pb-[32px] space-y-1 scrollbar-custom">
                {menuCategories.map((category) => (
                    <div key={category.title} className="w-full">
                        {/* Category Title */}
                        <div className="relative w-full h-[20px] select-none overflow-hidden" style={{ marginTop: '28px', marginBottom: '16px' }}>
                            {/* Expanded Title */}
                            <div className="absolute left-[24px] text-[12px] font-semibold tracking-wider text-[var(--text-muted)] transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto whitespace-nowrap">
                                {category.title}
                            </div>
                            {/* Collapsed Dots '...' */}
                            <div className="absolute inset-0 flex justify-center items-center text-[14px] font-bold tracking-[0.1em] text-[var(--text-muted)]/70 transition-all duration-300 opacity-100 group-hover:opacity-0 pointer-events-auto group-hover:pointer-events-none">
                                ...
                            </div>
                        </div>

                        {/* Category Items */}
                        <div className="flex flex-col">
                            {category.items.map((item) => {
                                const { Icon } = item;
                                const isActive = activeId === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        id={`left-icon-${item.id}`}
                                        onClick={() => onSelect({ id: item.id, label: item.label })}
                                        className="sidebar-menu-item relative flex items-center gap-[10px] w-[calc(100%_-_32px)] mx-4 h-[44px] rounded-[22px] transition-all duration-200 cursor-pointer group/item"
                                        style={{
                                            paddingLeft: '24px',
                                            color: isActive ? 'var(--left-sidebar-active)' : 'var(--left-sidebar-item-text)',
                                        }}
                                    >
                                        {/* Icon */}
                                        <div className="flex-shrink-0 flex items-center justify-center w-[20px] h-[20px]">
                                            <Icon
                                                size={18}
                                                strokeWidth={isActive ? 2.5 : 2}
                                                className="transition-all duration-200 group-hover/item:scale-105 group-hover/item:text-[var(--left-sidebar-hover-text)]"
                                            />
                                        </div>

                                        {/* Label */}
                                        <span
                                            className="text-[13px] font-semibold transition-all duration-300 whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto"
                                            style={{
                                                color: isActive ? 'var(--left-sidebar-active-label)' : 'var(--left-sidebar-item-label)',
                                            }}
                                        >
                                            {item.label}
                                        </span>

                                        {/* Chevron Arrow */}
                                        {item.hasSubmenu && (
                                            <ChevronRight
                                                size={13}
                                                className="absolute font-semibold right-[16px] transition-all duration-300 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto"
                                                style={{
                                                    color: isActive ? 'var(--left-sidebar-active-label)' : 'var(--left-sidebar-item-text)',
                                                }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
                {/* Scroll spacer at the very bottom */}
                <div className="h-[40px] w-full flex-shrink-0" />
            </div>
        </aside>
    );
}
