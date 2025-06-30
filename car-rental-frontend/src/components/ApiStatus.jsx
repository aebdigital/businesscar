import React, { useState, useEffect } from 'react';

const ApiStatus = () => {
  const [status, setStatus] = useState({
    api: 'testing',
    tenant: 'testing',
    config: 'loading'
  });

  useEffect(() => {
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    const API_BASE = 'https://carflow-reservation-system.onrender.com/api';
    const TENANT_EMAIL = 'rival@test.sk';

    const newStatus = {
      api: 'error',
      tenant: 'error',
      config: 'development'
    };

    // Test general API health
    try {
      const response = await fetch(`${API_BASE}/health`);
      if (response.ok) {
        newStatus.api = 'connected';
      }
    } catch (error) {
      console.warn('API health check failed:', error);
    }

    // Test tenant-specific endpoint
    try {
      const response = await fetch(`${API_BASE}/public/users/${encodeURIComponent(TENANT_EMAIL)}/cars`);
      if (response.ok) {
        newStatus.tenant = 'connected';
        newStatus.config = 'production';
      }
    } catch (error) {
      console.warn('Tenant API check failed:', error);
    }

    setStatus(newStatus);
  };

  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case 'connected': return 'text-green-600';
      case 'testing': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      case 'production': return 'text-green-600';
      case 'development': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (statusValue) => {
    switch (statusValue) {
      case 'connected': return '✅';
      case 'testing': return '🔄';
      case 'error': return '❌';
      case 'production': return '🚀';
      case 'development': return '🔧';
      default: return '❓';
    }
  };

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs z-50">
      <div className="font-semibold text-gray-700 mb-2">API Status</div>
      <div className="space-y-1">
        <div className={`flex items-center gap-2 ${getStatusColor(status.api)}`}>
          <span>{getStatusIcon(status.api)}</span>
          <span>API Server: {status.api}</span>
        </div>
        <div className={`flex items-center gap-2 ${getStatusColor(status.tenant)}`}>
          <span>{getStatusIcon(status.tenant)}</span>
          <span>RIVAL Tenant: {status.tenant}</span>
        </div>
        <div className={`flex items-center gap-2 ${getStatusColor(status.config)}`}>
          <span>{getStatusIcon(status.config)}</span>
          <span>Mode: {status.config}</span>
        </div>
      </div>
      <button 
        onClick={testApiConnection}
        className="mt-2 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
      >
        Refresh
      </button>
    </div>
  );
};

export default ApiStatus; 