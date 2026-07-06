import React from 'react';
import { Building2, Save, MapPin, Phone, Mail, FileText, Hash } from 'lucide-react';
import FormField from './FormField';

const CompanyProfile = () => {
  return (
    <div className="card">
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <Building2 size={17} style={{ color: 'var(--color-primary-muted)' }} />
          Company Profile
        </h3>
        <span className="text-muted text-sm">Legal & business details</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <FormField label="Company Name" icon={Building2} defaultValue="Shreeyansh Labs Pvt. Ltd." />
        <div className="bento bento-2">
          <FormField label="License Number" icon={FileText} defaultValue="GJ/MFG/2019/04521" />
          <FormField label="GSTIN" icon={Hash} defaultValue="24AADCS7612M1Z5" />
        </div>
        <FormField label="Registered Address" icon={MapPin} defaultValue="Plot No. 47, GIDC Phase-II, Sarigam, Valsad, Gujarat — 396155" textarea />
        <div className="bento bento-2">
          <FormField label="Contact Number" icon={Phone} defaultValue="+91 260 2585600" type="tel" />
          <FormField label="Email" icon={Mail} defaultValue="info@shreeyansh.in" type="email" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
          <button className="btn btn-primary text-sm">
            <Save size={14} />
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
