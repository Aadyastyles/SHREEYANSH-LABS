import React from 'react';

const FormField = ({ label, icon: Icon, defaultValue, type = 'text', textarea }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
    <label className="text-sm fw-500 text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
      {Icon && <Icon size={13} />}
      {label}
    </label>
    {textarea ? (
      <textarea
        defaultValue={defaultValue}
        rows={3}
        style={{ width: '100%', resize: 'vertical' }}
      />
    ) : (
      <input
        type={type}
        defaultValue={defaultValue}
        style={{ width: '100%' }}
      />
    )}
  </div>
);

export default FormField;
