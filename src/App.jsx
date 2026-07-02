import { useState, useEffect } from 'react';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Navbar from './components/Navbar';
import ContactFilters from './components/ContactFilters';
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';
import BottomNavbar from './components/BottomNavbar';
import { contacts, panelBackground } from './data/contactData';

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState({
    id: 'contacts',
    label: 'Contacts',
  });
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 769);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactFiltersOpen, setContactFiltersOpen] = useState(false);
  const [showContactDetail, setShowContactDetail] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 769;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
        setShowContactDetail(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    if (isMobile) {
      setShowContactDetail(true);
    }
  };

  const handleBackFromDetail = () => {
    setShowContactDetail(false);
  };

  // Desktop layout
  if (!isMobile) {
    return (
      <div
        id="app-root"
        className="relative h-screen overflow-hidden"
        style={{
          background: 'var(--app-bg)',
        }}
      >
        {/* Left Sidebar */}
        <LeftSidebar activeId={activeMenuItem.id} onSelect={setActiveMenuItem} />

        {/* Right Sidebar */}
        <RightSidebar />

        {/* Top Navbar */}
        <Navbar title={activeMenuItem.label} />

        {/* Main content area placeholder */}
        <main
          className="relative"
          style={{
            marginLeft: '62px',
            marginRight: '62px',
            paddingTop: '74px',
            height: 'calc(100vh - 74px)',
          }}
        >
          <div className="h-[calc(100vh-94px)] overflow-hidden rounded-[10px] border p-6"
            style={{
              padding: "20px",
              borderColor: "var(--main-border)",
            }}
          >
            <div className="grid h-full min-h-0 grid-cols-2 gap-12">
              <div className="grid h-full min-h-0 min-w-0 grid-cols-[45%_55%] gap-6">
                <ContactFilters />
                <ContactList
                  contacts={contacts}
                  selectedId={selectedContact.id}
                  onSelect={setSelectedContact}
                />
              </div>
              <ContactDetails contact={selectedContact} />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Mobile layout
  return (
    <div
      id="app-root"
      className="relative h-screen overflow-hidden"
      style={{
        background: 'var(--app-bg)',
      }}
    >
      {/* Mobile Top Navbar */}
      <Navbar title={activeMenuItem.label} isMobile={true} />

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="mobile-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar - Mobile (slide-in) */}
      <LeftSidebar
        activeId={activeMenuItem.id}
        onSelect={(item) => {
          setActiveMenuItem(item);
          setSidebarOpen(false);
        }}
        isMobile={true}
        isOpen={sidebarOpen}
      />

      {/* Contact Filters Sidebar - Mobile */}
      {contactFiltersOpen && (
        <div
          className="mobile-sidebar-overlay"
          onClick={() => setContactFiltersOpen(false)}
          style={{ zIndex: 58 }}
        />
      )}
      <ContactFilters
        isMobile={true}
        isOpen={contactFiltersOpen}
      />

      {/* Main Content */}
      <main
        className="relative flex flex-col"
        style={{
          paddingTop: '76px',
          paddingBottom: '66px',
          paddingLeft: '12px',
          paddingRight: '12px',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {showContactDetail ? (
          /* Contact Detail View */
          <div className="h-full overflow-hidden rounded-[10px] border"
            style={{
              padding: "10px",
              borderColor: "var(--main-border)",
            }}
          >
            <ContactDetails
              contact={selectedContact}
              isMobile={true}
              onBack={handleBackFromDetail}
            />
          </div>
        ) : (
          /* Contact List View */
          <div className="h-full overflow-hidden rounded-[10px] border"
            style={{
              padding: "10px",
              borderColor: "var(--main-border)",
            }}
          >
            <div className="flex flex-col h-full min-h-0">
              <ContactList
                contacts={contacts}
                selectedId={selectedContact.id}
                onSelect={handleContactSelect}
                isMobile={true}
                onMenuClick={() => setContactFiltersOpen(true)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navbar */}
      <BottomNavbar
        onHamburgerClick={() => setSidebarOpen((prev) => !prev)}
        sidebarOpen={sidebarOpen}
      />
    </div>
  );
}

export default App;
