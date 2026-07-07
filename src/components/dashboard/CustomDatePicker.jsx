import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomDatePicker = ({ selectedDate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    // Format to YYYY-MM-DD
    const yyyy = newDate.getFullYear();
    const mm = String(newDate.getMonth() + 1).padStart(2, '0');
    const dd = String(newDate.getDate()).padStart(2, '0');
    onChange(`${yyyy}-${mm}-${dd}`);
    setIsOpen(false);
  };

  const renderDays = () => {
    const days = [];
    const selected = new Date(selectedDate);
    
    // Empty slots for previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} style={{ width: '32px', height: '32px' }} />);
    }
    
    // Days of current month
    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = selected.getDate() === d && 
                         selected.getMonth() === currentMonth.getMonth() && 
                         selected.getFullYear() === currentMonth.getFullYear();
      
      const isToday = new Date().getDate() === d && 
                      new Date().getMonth() === currentMonth.getMonth() && 
                      new Date().getFullYear() === currentMonth.getFullYear();

      days.push(
        <div 
          key={d} 
          onClick={(e) => { e.stopPropagation(); handleDateClick(d); }}
          onMouseEnter={(e) => { if(!isSelected) e.currentTarget.style.background = 'var(--color-bg-main)'; }}
          onMouseLeave={(e) => { if(!isSelected) e.currentTarget.style.background = 'transparent'; }}
          style={{
            width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '8px', cursor: 'pointer',
            fontSize: '0.85rem', fontWeight: isSelected ? 700 : (isToday ? 600 : 500),
            color: isSelected ? '#FFFFFF' : (isToday ? 'var(--color-brand-blue)' : 'var(--color-text-dark)'),
            background: isSelected ? 'var(--color-brand-blue)' : 'transparent',
            boxShadow: isSelected ? '0 4px 12px rgba(46, 49, 146, 0.3)' : 'none',
            transition: 'all 0.2s ease',
            border: isToday && !isSelected ? '1px solid var(--color-border-light)' : '1px solid transparent'
          }}
        >
          {d}
        </div>
      );
    }
    return days;
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Trigger Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '6px 14px', background: isOpen ? 'var(--color-bg-main)' : 'var(--color-bg-card)',
          border: '1px solid',
          borderColor: isOpen ? 'var(--color-text-muted-dark)' : 'var(--color-border-light)',
          borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)',
          boxShadow: isOpen ? 'inset 0 2px 4px rgba(0,0,0,0.02)' : '0 2px 6px rgba(0,0,0,0.02)',
          cursor: 'pointer', transition: 'all 0.2s ease'
        }}
      >
        <Calendar size={14} style={{ color: isOpen ? 'var(--color-brand-blue)' : 'var(--color-primary-muted)', transition: 'color 0.2s ease' }} />
        <span>{new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </div>

      {/* Floating Dropdown */}
      {isOpen && (
        <div 
          className="animate-fade-up"
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', right: 0,
            width: '260px', background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04)',
            padding: '1rem', zIndex: 50,
            display: 'flex', flexDirection: 'column', gap: '0.75rem',
            animationDuration: '0.2s'
          }}
        >
          {/* Calendar Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.25rem' }}>
            <button 
              onClick={handlePrevMonth}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '8px', color: 'var(--color-text-muted-dark)', transition: 'background 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-main)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <ChevronLeft size={16} />
            </button>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <button 
              onClick={handleNextMonth}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '8px', color: 'var(--color-text-muted-dark)', transition: 'background 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-main)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Days of week header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', justifyItems: 'center', marginBottom: '4px' }}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-muted-dark)' }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', justifyItems: 'center' }}>
            {renderDays()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
