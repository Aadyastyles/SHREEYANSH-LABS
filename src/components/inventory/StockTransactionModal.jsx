import React, { useState } from 'react';
import { X } from 'lucide-react';

const StockTransactionModal = ({ onClose, onSubmit }) => {
  const [type, setType] = useState('IN');
  const [category, setCategory] = useState('Yellow Phosphorus');
  const [qty, setQty] = useState('');
  const [unit, setUnit] = useState('kg');
  const [party, setParty] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!qty || !party) return;
    
    // Generate a new ID and dummy date just to simulate local functionality
    const newItem = {
      id: `INV-2026-${Math.floor(Math.random() * 900) + 100}`,
      category,
      name: party, // we'll use party as the item/reference name
      qty: parseInt(qty, 10),
      unit,
      location: type === 'IN' ? 'Warehouse / Receiving' : 'Dispatch / Floor',
      status: type === 'IN' ? 'Available' : 'Empty',
      date: '25 Jun 2026'
    };
    
    if (onSubmit) {
      onSubmit(newItem);
    }
    onClose();
  };
  
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999
    }}>
      <div className="card animate-fade-up" style={{ width: '450px', padding: '2rem', position: 'relative' }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted-dark)' }}
        >
          <X size={20} />
        </button>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Inventory Transaction</h2>
        <p className="text-muted text-sm" style={{ marginBottom: '1.5rem' }}>Record a new stock in or out movement.</p>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: '#F3F4F6', padding: '4px', borderRadius: '8px' }}>
          <button 
            type="button"
            onClick={() => setType('IN')}
            style={{ 
              flex: 1, padding: '0.5rem', border: 'none', borderRadius: '6px', fontWeight: 600,
              background: type === 'IN' ? '#fff' : 'transparent',
              color: type === 'IN' ? 'var(--color-brand-blue)' : 'var(--color-text-muted-dark)',
              boxShadow: type === 'IN' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer'
            }}>Stock In</button>
          <button 
            type="button"
            onClick={() => setType('OUT')}
            style={{ 
              flex: 1, padding: '0.5rem', border: 'none', borderRadius: '6px', fontWeight: 600,
              background: type === 'OUT' ? '#fff' : 'transparent',
              color: type === 'OUT' ? 'var(--color-danger)' : 'var(--color-text-muted-dark)',
              boxShadow: type === 'OUT' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer'
            }}>Stock Out</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Category</label>
              <select style={{ width: '100%' }} value={category} onChange={e => setCategory(e.target.value)}>
                <option>Yellow Phosphorus</option>
                <option>Chlorine</option>
                <option>Finished Goods</option>
                <option>Carboys</option>
                <option>CaCO3 Flakes</option>
                <option>Coal</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Quantity</label>
                <input type="number" required placeholder="0" style={{ width: '100%' }} value={qty} onChange={e => setQty(e.target.value)} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Unit</label>
                <select style={{ width: '100%' }} value={unit} onChange={e => setUnit(e.target.value)}>
                  <option>kg</option>
                  <option>units</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Party / Reference</label>
              <input type="text" required placeholder={type === 'IN' ? 'Supplier name (e.g. SCIMPLIFY)' : 'Client name or Production Batch'} style={{ width: '100%' }} value={party} onChange={e => setParty(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem', marginTop: '0.5rem', fontSize: '0.95rem' }}>
              Confirm {type === 'IN' ? 'Stock In' : 'Stock Out'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default StockTransactionModal;
