import React, { useContext } from 'react';
import { UserContext } from '../admin/context'; // adjust path as needed

export default function Export() {
  const { womenUsers } = useContext(UserContext);

  const handleExport = () => {
    if (!womenUsers || womenUsers.length === 0) {
      alert("No data to export");
      return;
    }

    // Dynamically extract headers from first object
    const headers = Object.keys(womenUsers[0]);

    const csvRows = [
      headers.join(","), // Header row
      ...womenUsers.map(user => headers.map(header => JSON.stringify(user[header] ?? "")).join(","))
    ];

    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = "users_export.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>Export Data</h2>
      <button onClick={handleExport}>Export All Users as CSV</button>
    </div>
  );
}
