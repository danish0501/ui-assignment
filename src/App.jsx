import { useState } from 'react';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Navbar from './components/Navbar';
import ContactFilters from './components/ContactFilters';
import ContactList from './components/ContactList';
import ContactDetails from './components/ContactDetails';
import { contacts, panelBackground } from './data/contactData';

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState({
    id: 'contacts',
    label: 'Contacts',
  });
  const [selectedContact, setSelectedContact] = useState(contacts[0]);

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

export default App;
