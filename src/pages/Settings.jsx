import React from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';

// Sub-components
import ProductConfiguration from '../components/settings/ProductConfiguration';
import CompanyProfile from '../components/settings/CompanyProfile';
import SupplierDefaults from '../components/settings/SupplierDefaults';
import UserManagement from '../components/settings/UserManagement';

const Settings = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <header className="page-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 38, height: 38, borderRadius: 'var(--radius-sm)',
            background: 'rgba(20, 221, 60, 0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <SettingsIcon size={20} style={{ color: 'var(--color-primary)' }} />
          </div>
          Settings
        </div>
        <button className="btn btn-dark">
          <Save size={16} />
          Save Changes
        </button>
      </header>

      {/* Row 1: Product Configuration + Company Profile */}
      <div className="bento bento-2">
        <ProductConfiguration />
        <CompanyProfile />
      </div>

      {/* Row 2: YP Supplier Defaults + User Management */}
      <div className="bento bento-2">
        <SupplierDefaults />
        <UserManagement />
      </div>
    </div>
  );
};

export default Settings;
