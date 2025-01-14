import React from 'react';
import { Line } from 'react-chartjs-2';
import { FaWallet, FaHome, FaRegBell, FaCog, FaUserCircle, FaPowerOff } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './WelcomePage.css'; // Import the CSS file for the welcome page

// Register the components with Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WelcomePage = () => {
  const navigate = useNavigate();

  // Chart data
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sales Data Over Time',
      },
    },
  };

  // Logout function
  const handleLogout = () => {
    navigate('/'); // Navigate to the Login page
  };

  return (
    <div className="welcome-page-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <FaWallet className="sidebar-icon" />
          <span className="sidebar-text">BankDash</span>
        </div>
        <div className="sidebar-menu">
          <div className="menu-item active">
            <FaHome className="menu-icon" />
            <span>Dashboard</span>
          </div>
          <div className="menu-item">
            <span>Transactions</span>
          </div>
          <div className="menu-item">
            <span>Accounts</span>
          </div>
          <div className="menu-item">
            <span>Investments</span>
          </div>
          <div className="menu-item">
            <span>Credit Cards</span>
          </div>
          <div className="menu-item">
            <span>Loans</span>
          </div>
          <div className="menu-item">
            <span>Services</span>
          </div>
          <div className="menu-item">
            <span>My Privileges</span>
          </div>
          <div className="menu-item">
            <FaCog className="menu-icon" />
            <span>Settings</span>
          </div>
        </div>
        <div className="logout" onClick={handleLogout}>
          <FaPowerOff className="logout-icon" />
          <span>Logout</span>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        {/* Top Navbar */}
        <div className="top-navbar">
          <span className="overview">Overview</span>
          <div className="top-right">
            <div className="search-bar-container">
              <MdSearch className="search-icon" />
              <input type="text" className="search-bar" placeholder="Search..." />
            </div>
            <FaRegBell className="top-icon" />
            <FaCog className="top-icon" />
            <FaUserCircle className="profile-icon" />
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <h2>Welcome to the Dashboard</h2>
          <div className="chart-container">
            {/* Chart component */}
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
