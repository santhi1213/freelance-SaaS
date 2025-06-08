// SystemSettings.jsx
import React, { useState, useEffect } from 'react';
import { 
  getSystemSettings, 
  updateSystemSettings 
} from '../services/adminService';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    maxEventCreationsPerDay: 0,
    maxFileUploadSize: 0,
    allowPublicEventCreation: true,
    requireEmailVerification: true,
    maintenanceMode: false,
    paymentGateways: {
      stripe: {
        enabled: false,
        testMode: true,
        publicKey: '',
        secretKey: ''
      },
      paypal: {
        enabled: false,
        testMode: true,
        clientId: '',
        clientSecret: ''
      }
    },
    socialLogin: {
      google: {
        enabled: false,
        clientId: '',
        clientSecret: ''
      },
      facebook: {
        enabled: false,
        appId: '',
        appSecret: ''
      }
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await getSystemSettings();
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching system settings:', error);
      setError('Failed to load system settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateSystemSettings(settings);
      setSuccess('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      setError('Failed to update settings. Please try again.');
    } finally {
      setSaving(false);
      setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setSettings(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleNestedInputChange = (e, section, subsection = null) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    if (subsection) {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subsection]: {
            ...prev[section][subsection],
            [name]: newValue
          }
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: newValue
        }
      }));
    }
  };

  if (loading) {
    return <div className="loading">Loading system settings...</div>;
  }

  return (
    <div className="system-settings">
      <h1>System Settings</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <div className="tabs">
        <button 
          className={activeTab === 'general' ? 'active' : ''} 
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button 
          className={activeTab === 'payment' ? 'active' : ''} 
          onClick={() => setActiveTab('payment')}
        >
          Payment
        </button>
        <button 
          className={activeTab === 'social' ? 'active' : ''} 
          onClick={() => setActiveTab('social')}
        >
          Social Login
        </button>
        <button 
          className={activeTab === 'advanced' ? 'active' : ''} 
          onClick={() => setActiveTab('advanced')}
        >
          Advanced
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="settings-section">
            <h2>General Settings</h2>
            
            <div className="form-group">
              <label htmlFor="siteName">Site Name</label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={settings.siteName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="siteDescription">Site Description</label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleInputChange}
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contactEmail">Contact Email</label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="requireEmailVerification"
                name="requireEmailVerification"
                checked={settings.requireEmailVerification}
                onChange={handleInputChange}
              />
              <label htmlFor="requireEmailVerification">Require Email Verification</label>
            </div>
            
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="allowPublicEventCreation"
                name="allowPublicEventCreation"
                checked={settings.allowPublicEventCreation}
                onChange={handleInputChange}
              />
              <label htmlFor="allowPublicEventCreation">Allow Public Event Creation</label>
            </div>
          </div>
        )}
        
        {/* Payment Settings */}
        {activeTab === 'payment' && (
          <div className="settings-section">
            <h2>Payment Gateway Settings</h2>
            
            <div className="payment-section">
              <h3>Stripe</h3>
              
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="stripe-enabled"
                  name="enabled"
                  checked={settings.paymentGateways.stripe.enabled}
                  onChange={(e) => handleNestedInputChange(e, 'paymentGateways', 'stripe')}
                />
                <label htmlFor="stripe-enabled">Enable Stripe</label>
              </div>
              
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="stripe-testMode"
                  name="testMode"
                  checked={settings.paymentGateways.stripe.testMode}
                  onChange={(e) => handleNestedInputChange(e, 'paymentGateways', 'stripe')}
                />
                <label htmlFor="stripe-testMode">Test Mode</label>
              </div>
              
              <div className="form-group">
                <label htmlFor="stripe-publicKey">Public Key</label>
                <input
                  type="text"
                  id="stripe-publicKey"
                  name="publicKey"
                  value={settings.paymentGateways.stripe.publicKey}
                  onChange={(e) => handleNestedInputChange(e, 'paymentGateways', 'stripe')}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="stripe-secretKey">Secret Key</label>
                <input
                  type="password"
                  id="stripe-secretKey"
                  name="secretKey"
                  value={settings.paymentGateways.stripe.secretKey}
                  onChange={(e) => handleNestedInputChange(e, 'paymentGateways', 'stripe')}
                />
              </div>
            </div>
            
            <div className="payment-section">
              <h3>PayPal</h3>
              
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="paypal-enabled"
                  name="enabled"
                  checked={settings.paymentGateways.paypal.enabled}
                  onChange={(e) => handleNestedInputChange(e, 'paymentGateways', 'paypal')}
                />
                <label htmlFor="paypal-enabled">Enable PayPal</label>
              </div>
              
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="paypal-testMode"
                  name="testMode"
                  checked={settings.paymentGateways.paypal.testMode}
                  onChange={(e) => handleNestedInputChange(e, 'paymentGateways', 'paypal')}
                />
                <label htmlFor="paypal-testMode">Test Mode</label>
              </div>
              
              <div className="form-group">
                <label htmlFor="paypal-clientId">Client ID</label>
                <input
                  type="text"
                  id="paypal-clientId"
                  name="clientId"
                  value={settings.paymentGateways.paypal.clientId}
                  onChange={(e) => handleNestedInputChange(e, 'paymentGateways', 'paypal')}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="paypal-clientSecret">Client Secret</label>
                <input
                  type="password"
                  id="paypal-clientSecret"
                  name="clientSecret"
                  value={settings.paymentGateways.paypal.clientSecret}
                  onChange={(e) => handleNestedInputChange(e, 'paymentGateways', 'paypal')}
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Social Login Settings */}
        {activeTab === 'social' && (
          <div className="settings-section">
            <h2>Social Login Settings</h2>
            
            <div className="social-section">
              <h3>Google</h3>
              
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="google-enabled"
                  name="enabled"
                  checked={settings.socialLogin.google.enabled}
                  onChange={(e) => handleNestedInputChange(e, 'socialLogin', 'google')}
                />
                <label htmlFor="google-enabled">Enable Google Login</label>
              </div>
              
              <div className="form-group">
                <label htmlFor="google-clientId">Client ID</label>
                <input
                  type="text"
                  id="google-clientId"
                  name="clientId"
                  value={settings.socialLogin.google.clientId}
                  onChange={(e) => handleNestedInputChange(e, 'socialLogin', 'google')}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="google-clientSecret">Client Secret</label>
                <input
                  type="password"
                  id="google-clientSecret"
                  name="clientSecret"
                  value={settings.socialLogin.google.clientSecret}
                  onChange={(e) => handleNestedInputChange(e, 'socialLogin', 'google')}
                />
              </div>
            </div>
            
            <div className="social-section">
              <h3>Facebook</h3>
              
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="facebook-enabled"
                  name="enabled"
                  checked={settings.socialLogin.facebook.enabled}
                  onChange={(e) => handleNestedInputChange(e, 'socialLogin', 'facebook')}
                />
                <label htmlFor="facebook-enabled">Enable Facebook Login</label>
              </div>
              
              <div className="form-group">
                <label htmlFor="facebook-appId">App ID</label>
                <input
                  type="text"
                  id="facebook-appId"
                  name="appId"
                  value={settings.socialLogin.facebook.appId}
                  onChange={(e) => handleNestedInputChange(e, 'socialLogin', 'facebook')}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="facebook-appSecret">App Secret</label>
                <input
                  type="password"
                  id="facebook-appSecret"
                  name="appSecret"
                  value={settings.socialLogin.facebook.appSecret}
                  onChange={(e) => handleNestedInputChange(e, 'socialLogin', 'facebook')}
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Advanced Settings */}
        {activeTab === 'advanced' && (
          <div className="settings-section">
            <h2>Advanced Settings</h2>
            
            <div className="form-group">
              <label htmlFor="maxEventCreationsPerDay">Max Event Creations Per Day</label>
              <input
                type="number"
                id="maxEventCreationsPerDay"
                name="maxEventCreationsPerDay"
                value={settings.maxEventCreationsPerDay}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="maxFileUploadSize">Max File Upload Size (MB)</label>
              <input
                type="number"
                id="maxFileUploadSize"
                name="maxFileUploadSize"
                value={settings.maxFileUploadSize}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="maintenanceMode"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleInputChange}
              />
              <label htmlFor="maintenanceMode">Maintenance Mode</label>
              <p className="helper-text">
                When enabled, the site will show a maintenance page to all non-admin users.
              </p>
            </div>
          </div>
        )}
        
        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SystemSettings;