

import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const navItems = [
  { id: 'dashboard', label: 'Dashboard' },
    { id: 'allusers', label: 'All Users' },
  { id: 'talent', label: "Women's Talent Pool" },
  {id:'industries',label:"Industries"},
  {id:'blogs',label:"Blogs"},
  { id: 'employers', label: 'Employers' },
  { id: 'jobs', label: 'Jobs' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'export', label: 'Export Data' },
];

export default function Sidebar({ active, setActive, isOpen, onClose }) {
  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-close-btn" onClick={onClose}>
        <AiOutlineClose size={22} />
      </div>
      <ul>
        {navItems.map(item => (
          <li
            key={item.id}
            className={active === item.id ? 'active' : ''}
            onClick={() => {
              setActive(item.id);
              onClose(); // close sidebar on mobile click
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
