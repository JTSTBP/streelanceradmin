import React, { useState } from 'react';
const demoJobs = [
  { id: 1, title: "Frontend Dev", company: "Acme", location: "Remote", status: "active" },
  { id: 2, title: "Marketing Manager", company: "Techies", location: "Hybrid", status: "pending" }
];
export default function Jobs() {
  const [jobs, setJobs] = useState(demoJobs);

  const handleApprove = id => setJobs(jobs.map(j => j.id === id ? { ...j, status: 'active' } : j));
  const handleDeactivate = id => setJobs(jobs.map(j => j.id === id ? { ...j, status: 'inactive' } : j));
  return (
    <div>
      <h2>Job Posts</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th><th>Company</th><th>Location</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(j => (
            <tr key={j.id}>
              <td>{j.title}</td>
              <td>{j.company}</td>
              <td>{j.location}</td>
              <td>{j.status}</td>
              <td>
                {j.status === "pending" &&
                  <button onClick={() => handleApprove(j.id)}>Approve</button>
                }
                {j.status === "active" &&
                  <button onClick={() => handleDeactivate(j.id)}>Deactivate</button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
