// DashboardHome.jsx
import React, { useState, useEffect } from 'react';
import { 
  getUserAnalytics, 
  getEventAnalytics,
  getRegistrationAnalytics,
  getRevenueAnalytics
} from '../services/adminService';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const DashboardHome = ({ stats }) => {
  const [period, setPeriod] = useState('month');
  const [userAnalytics, setUserAnalytics] = useState([]);
  const [eventAnalytics, setEventAnalytics] = useState([]);
  const [registrationAnalytics, setRegistrationAnalytics] = useState([]);
  const [revenueAnalytics, setRevenueAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        
        const [userResponse, eventResponse, registrationResponse, revenueResponse] = await Promise.all([
          getUserAnalytics(period),
          getEventAnalytics(period),
          getRegistrationAnalytics(period),
          getRevenueAnalytics(period)
        ]);
        
        setUserAnalytics(userResponse.data);
        setEventAnalytics(eventResponse.data);
        setRegistrationAnalytics(registrationResponse.data);
        setRevenueAnalytics(revenueResponse.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [period]);

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  return (
    <div className="dashboard-home">
      <h1>Admin Dashboard</h1>
      
      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats?.totalUsers || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Active Events</h3>
          <p className="stat-value">{stats?.activeEvents || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Events</h3>
          <p className="stat-value">{stats?.pendingEvents || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">${stats?.totalRevenue || 0}</p>
        </div>
      </div>
      
      <div className="analytics-controls">
        <label htmlFor="period-select">Time Period:</label>
        <select 
          id="period-select" 
          value={period} 
          onChange={handlePeriodChange}
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>
      
      {loading ? (
        <div className="loading">Loading analytics data...</div>
      ) : (
        <div className="analytics-charts">
          <div className="chart-container">
            <h3>User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userAnalytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart-container">
            <h3>Event Creation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={eventAnalytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#82ca9d" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart-container">
            <h3>Event Registrations</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={registrationAnalytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#ffc658" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart-container">
            <h3>Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueAnalytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#ff8042" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;