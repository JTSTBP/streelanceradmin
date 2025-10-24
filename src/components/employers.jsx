import React, { useState } from 'react';
const demoEmployers = [
  { id: 1, name: "Acme Corp", email: "contact@acme.com", status: "pending" },
  { id: 2, name: "Techies Ltd", email: "hi@techies.com", status: "approved" }
];
export default function Employers() {
  const [employers, setEmployers] = useState(demoEmployers);

  const handleApprove = id => setEmployers(employers.map(emp => emp.id === id ? { ...emp, status: 'approved' } : emp));
  return (
    <div>
      <h2>Employers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {employers.map(emp => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.status}</td>
            <td>
              {emp.status === "pending" &&
                <button onClick={() => handleApprove(emp.id)}>Approve</button>
              }
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
