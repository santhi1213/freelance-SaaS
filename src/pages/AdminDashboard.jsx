// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { 
  getDashboardStats, 
  getUserAnalytics, 
  getEventAnalytics,
  getRegistrationAnalytics,
  getRevenueAnalytics
} from '../services/adminService';
import Sidebar from './Sidebar';
import DashboardHome from './DashboardHome';
import CategoriesManager from './CategoriesManager';
import LocationsManager from './LocationsManager';
import EventsManager from './EventsManager';
import FeaturedEvents from './FeaturedEvents';
import SystemSettings from './SystemSettings';
import EmailTemplates from './EmailTemplates';
import SystemLogs from './SystemLogs';
import ExportData from './ExportData';
import PaymentReports from './PaymentReports';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      
      <div className="dashboard-content">
        {loading ? (
          <div className="loading">Loading dashboard data...</div>
        ) : (
          <Routes>
            <Route path="/" element={<DashboardHome stats={stats} />} />
            <Route path="/categories" element={<CategoriesManager />} />
            <Route path="/locations" element={<LocationsManager />} />
            <Route path="/events" element={<EventsManager />} />
            <Route path="/featured-events" element={<FeaturedEvents />} />
            <Route path="/settings" element={<SystemSettings />} />
            <Route path="/email-templates" element={<EmailTemplates />} />
            <Route path="/logs" element={<SystemLogs />} />
            <Route path="/export" element={<ExportData />} />
            <Route path="/payments" element={<PaymentReports />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;