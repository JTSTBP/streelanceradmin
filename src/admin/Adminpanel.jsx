

import React, { useState } from 'react';
import './style.css';
import Dashboard from '../components/Dashboard';
import TalentPool from '../components/womentalent/talentpool';
import Employers from '../components/employers';
import Jobs from '../components/jobs';
import Notifications from '../components/notifications';
import Export from '../components/exports';
import Sidebar from '../components/sidebar';
import { FiMenu } from 'react-icons/fi'; // hamburger icon
import UserList from '../components/allusers';
import IndustriesAdmin from '../components/data/industries';
import BlogActions from '../components/blogs/Blogs';

const sections = {
  dashboard: <Dashboard />,
  allusers:<UserList/>,
  talent: <TalentPool />,
  industries:<IndustriesAdmin/>,
  blogs:<BlogActions/>,
  employers: <Employers />,
  jobs: <Jobs />,
  notifications: <Notifications />,
  export: <Export />,
};

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-container">
      <button className={`hamburger ${sidebarOpen ? 'closeham' : ''}`} onClick={() => setSidebarOpen(true)}>
        <FiMenu size={26} />
      </button>

      <Sidebar
        active={activeSection}
        setActive={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="admin-main">
        <header className="admin-header">
          <h1>Admin Panel</h1>
        </header>
        <section>
          {sections[activeSection]}
        </section>
      </main>
    </div>
  );
}
