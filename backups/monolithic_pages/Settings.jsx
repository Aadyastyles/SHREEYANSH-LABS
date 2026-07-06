import React from 'react';
import {
  Settings as SettingsIcon, Pencil, Building2, Users, Truck,
  FlaskConical, ShieldCheck, CircleDot, Save, Mail, Phone,
  MapPin, FileText, Hash
} from 'lucide-react';

/* ── Data ── */
const products = [
  { name: 'PCL3',  formula: 'PCl₃',  yieldRatio: '4.43:1', price: '₹285/kg', hsn: '28121090', gst: '18%' },
  { name: 'PCL5',  formula: 'PCl₅',  yieldRatio: '6.72:1', price: '₹410/kg', hsn: '28121090', gst: '18%' },
  { name: 'POCL3', formula: 'POCl₃', yieldRatio: '4.94:1', price: '₹340/kg', hsn: '28121090', gst: '18%' },
];

const suppliers = [
  { name: 'Hindustan Phosphorus Ltd.', location: 'Kochi, Kerala',     rate: '₹480/kg', terms: 'Net 30 Days',  status: 'Active' },
  { name: 'Tata Chemicals Ltd.',       location: 'Mithapur, Gujarat', rate: '₹495/kg', terms: 'Net 45 Days',  status: 'Active' },
  { name: 'Paras Phosphates',          location: 'Udaipur, Rajasthan', rate: '₹460/kg', terms: 'Advance 50%', status: 'Active' },
];

const users = [
  { name: 'Rajesh Mehta',   email: 'rajesh@shreeyansh.in',  role: 'Admin',    badge: 'badge-green',  status: 'Online',  statusColor: '#14DD3C' },
  { name: 'Priya Sharma',   email: 'priya@shreeyansh.in',   role: 'Manager',  badge: 'badge-blue',   status: 'Online',  statusColor: '#14DD3C' },
  { name: 'Amit Patel',     email: 'amit@shreeyansh.in',    role: 'Operator', badge: 'badge-neutral', status: 'Offline', statusColor: '#6B726D' },
];

/* ── Styled form field ── */
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

/* ── Settings Page ── */
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
        {/* ── Product Configuration ── */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <FlaskConical size={17} style={{ color: 'var(--color-primary-muted)' }} />
                Product Configuration
              </h3>
              <span className="text-muted text-sm">Yield ratios, pricing & tax codes</span>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Yield Ratio (YP:Product)</th>
                <th>Selling Price</th>
                <th>HSN Code</th>
                <th>GST</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.name}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 'var(--radius-xs)',
                        background: 'rgba(20, 221, 60, 0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-primary-muted)',
                      }}>
                        {p.name}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.name}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{p.formula}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '0.9rem' }}>{p.yieldRatio}</td>
                  <td style={{ fontWeight: 600 }}>{p.price}</td>
                  <td>
                    <span style={{
                      background: 'var(--color-bg-main)', padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-xs)', fontSize: '0.8rem', fontFamily: 'monospace',
                      border: '1px solid var(--color-border-light)',
                    }}>
                      {p.hsn}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-neutral">{p.gst}</span>
                  </td>
                  <td>
                    <button className="btn btn-outline text-sm" style={{ padding: '0.35rem 0.7rem' }}>
                      <Pencil size={13} />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Company Profile ── */}
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
      </div>

      {/* Row 2: YP Supplier Defaults + User Management */}
      <div className="bento bento-2">
        {/* ── YP Supplier Defaults ── */}
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Truck size={17} style={{ color: 'var(--color-primary-muted)' }} />
                YP Supplier Defaults
              </h3>
              <span className="text-muted text-sm">Yellow Phosphorus procurement partners</span>
            </div>
            <button className="btn btn-outline text-sm">
              + Add Supplier
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {suppliers.map((s, idx) => (
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
                  <div style={{
                    width: 40, height: 40, borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary-muted)',
                  }}>
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{s.name}</div>
                    <div className="text-muted text-xs" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={11} /> {s.location}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{s.rate}</div>
                    <div className="text-muted text-xs">{s.terms}</div>
                  </div>
                  <span className="badge badge-green">
                    <CircleDot size={8} />
                    {s.status}
                  </span>
                  <button className="btn btn-outline text-sm" style={{ padding: '0.3rem 0.6rem' }}>
                    <Pencil size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── User Management ── */}
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
      </div>
    </div>
  );
};

export default Settings;
