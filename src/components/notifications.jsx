import React from 'react';
// This would usually be fetched
const notifications = [
  { id: 1, text: "New signup: Ayesha Khan" },
  { id: 2, text: "Job posted: Marketing Manager by Techies Ltd" }
];
export default function Notifications() {
  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map(n => (
          <li key={n.id}>{n.text}</li>
        ))}
      </ul>
      <span style={{ fontSize: 12, color: '#888' }}>
        (Automation: Notify new users by email/WhatsApp)
      </span>
    </div>
  );
}
