import React from 'react';
import { Users, Mail, ShieldCheck, Pencil } from 'lucide-react';
import { users } from './SettingsData';

const UserManagement = () => {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Users size={17} style={{ color: 'var(--color-primary-muted)' }} />
            User Management
          </h3>
          <span className="text-muted text-sm">Portal access & roles</span>
        </div>
        <button className="btn btn-outline text-sm">
          + Invite User
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {users.map((u, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-light)',
              background: 'var(--color-bg-main)',
              transition: 'all 0.2s ease', cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Avatar */}
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'var(--color-bg-dark)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-white)',
                position: 'relative',
              }}>
                {u.name.split(' ').map(n => n[0]).join('')}
                {/* Status dot */}
                <div style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: 10, height: 10, borderRadius: '50%',
                  background: u.statusColor,
                  border: '2px solid var(--color-bg-main)',
                }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{u.name}</div>
                <div className="text-muted text-xs" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Mail size={11} /> {u.email}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className={`badge ${u.badge}`}>
                <ShieldCheck size={11} />
                {u.role}
              </span>
              <button className="btn btn-outline text-sm" style={{ padding: '0.3rem 0.6rem' }}>
                <Pencil size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Roles legend */}
      <div style={{
        marginTop: '1rem', paddingTop: '0.85rem',
        borderTop: '1px solid var(--color-border-light)',
      }}>
        <div className="text-xs text-muted fw-500" style={{ marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Role Permissions
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {[
            { role: 'Admin',    desc: 'Full access — settings, users, reports, production' },
            { role: 'Manager',  desc: 'Production, inventory, costing & reports' },
            { role: 'Operator', desc: 'Production entry & batch logs only' },
          ].map(r => (
            <div key={r.role} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
              <span style={{
                fontWeight: 600, minWidth: 68,
                color: 'var(--color-text-dark)',
              }}>{r.role}</span>
              <span className="text-muted">— {r.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
