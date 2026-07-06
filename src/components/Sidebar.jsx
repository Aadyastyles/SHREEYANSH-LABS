import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Package, FlaskConical, ShoppingCart,
  Calculator, FileBarChart, Settings, ChevronRight, Activity
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Process Flow', icon: Activity, path: '/process-flow' },
  { name: 'Inventory', icon: Package, path: '/inventory' },
  { name: 'Production', icon: FlaskConical, path: '/production' },
  { name: 'Sales & POs', icon: ShoppingCart, path: '/sales' },
  { name: 'Costing', icon: Calculator, path: '/costing' },
  { name: 'Daily Reports', icon: FileBarChart, path: '/reports' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo */}
      <div style={{ padding: '2rem 1.5rem 1rem', borderBottom: '1px solid var(--color-border-light)' }}>
        <img 
          src="/logo.png" 
          alt="Shreeyansh Labs Logo" 
          style={{ width: '100%', maxWidth: '220px', height: 'auto', display: 'block', margin: '0 auto' }} 
        />
      </div>

      {/* Navigation */}
      <nav style={{ padding: '1.5rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{
          fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted-dark)',
          letterSpacing: '0.12em', padding: '0.5rem 1.5rem 1rem', textTransform: 'uppercase',
        }}>
          Main Menu
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={22} strokeWidth={2.5} />
            <span style={{ flex: 1 }}>{item.name}</span>
            <ChevronRight size={16} strokeWidth={2.5} className="chevron" />
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div style={{
        padding: '1.5rem 2rem',
        borderTop: '1px solid var(--color-border-light)',
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(22, 188, 228, 0.15), rgba(13, 150, 184, 0.15))',
          border: '1px solid rgba(22, 188, 228, 0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', fontWeight: 700, color: 'var(--color-brand-blue)',
        }}>
          HO
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text-dark)' }}>HO Admin</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted-dark)', marginTop: '0.1rem' }}>Head Office</div>
        </div>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: 'var(--color-primary)',
          boxShadow: '0 0 10px rgba(22, 188, 228, 0.6)',
        }} />
      </div>
    </div>
  );
};

export default Sidebar;
