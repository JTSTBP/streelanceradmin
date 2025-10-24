import React,{useContext} from 'react';
import { UserContext } from "../admin/context";

export default function Dashboard() {
       const { womenUsers ,allUsers,blogs} = useContext(UserContext);
  // Static demo data (to be fetched from an API)
  const stats = [
        { label: "All Users ", value: allUsers.length },
    { label: "New Women Signups", value: womenUsers.length },
        { label: "Total Blogs", value: blogs.length },
    { label: "New Employers", value: 10 },
    { label: "Jobs Posted", value: 15 },
    // { label: "Applications", value: 80 },
    // { label: "Total Hires", value: 5 }
  ];
  return (
    <div className="dashboard-section">
      <h2>Analytics Overview</h2>
      <div className="dashboard-stats">
        {stats.map((stat, i) => (
          <div key={i} className="dashboard-stat-card">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
          </div>
        ))}
      </div>
      <p style={{marginTop:"24px", color:"#444"}}>
        (Use Chart.js or Recharts for detailed charts)
      </p>
    </div>
  );
}
