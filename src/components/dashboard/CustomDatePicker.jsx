import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomDatePicker = ({ mode = 'daily', selectedDate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate || '2026-07-01'));
  const dropdownRef = useRef(null);

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
    const yyyy = newDate.getFullYear();
    const mm = String(newDate.getMonth() + 1).padStart(2, '0');
    const dd = String(newDate.getDate()).padStart(2, '0');
    onChange(`${yyyy}-${mm}-${dd}`);
    setIsOpen(false);
  };

  const handleWeekClick = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    // Find the week number or just format it as Week X
    const weekNum = Math.ceil((newDate.getDate() + 6 - newDate.getDay()) / 7);
    const yyyy = newDate.getFullYear();
    const mm = String(newDate.getMonth() + 1).padStart(2, '0');
    // Just passing a string to represent the week
    onChange(`Week ${weekNum}, ${newDate.toLocaleString('default', { month: 'short' })} ${yyyy}`);
    setIsOpen(false);
  };

  const handleMonthClick = (monthIndex) => {
    const yyyy = currentMonth.getFullYear();
    const mm = String(monthIndex + 1).padStart(2, '0');
    onChange(`${yyyy}-${mm}`); // YYYY-MM
    setIsOpen(false);
  };

  // Build grid of days to easily identify weeks for Weekly mode
  const renderCalendarGrid = () => {
    const weeks = [];
    let currentWeek = [];
    
    // empty days before first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      currentWeek.push(null);
    }
    
    for (let d = 1; d <= daysInMonth; d++) {
      currentWeek.push(d);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      weeks.push(currentWeek);
    }

    const selected = selectedDate ? new Date(selectedDate) : new Date();

    return weeks.map((week, wIdx) => {
      // For weekly mode, we highlight the whole row on hover
      return (
        <div 
          key={wIdx} 
          style={{ 
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', justifyItems: 'center',
            borderRadius: mode === 'weekly' ? '8px' : '0',
            background: 'transparent',
            cursor: mode === 'weekly' ? 'pointer' : 'default',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => { if(mode === 'weekly') e.currentTarget.style.background = 'var(--color-bg-main)'; }}
          onMouseLeave={(e) => { if(mode === 'weekly') e.currentTarget.style.background = 'transparent'; }}
          onClick={(e) => { 
            if(mode === 'weekly') {
              e.stopPropagation();
              // use the first valid day in this week to calculate week string
              const firstValidDay = week.find(d => d !== null);
              if(firstValidDay) handleWeekClick(firstValidDay);
            }
          }}
        >
          {week.map((d, dIdx) => {
            if (d === null) return <div key={`empty-${dIdx}`} style={{ width: '32px', height: '32px' }} />;
            
            const isSelectedDaily = mode === 'daily' && selected.getDate() === d && 
                                    selected.getMonth() === currentMonth.getMonth() && 
                                    selected.getFullYear() === currentMonth.getFullYear();
            
            const isToday = new Date().getDate() === d && 
                            new Date().getMonth() === currentMonth.getMonth() && 
                            new Date().getFullYear() === currentMonth.getFullYear();

            return (
              <div 
                key={d} 
                onClick={(e) => { 
                  if(mode === 'daily') {
                    e.stopPropagation(); handleDateClick(d); 
                  }
                }}
                onMouseEnter={(e) => { 
                  if(mode === 'daily' && !isSelectedDaily) e.currentTarget.style.background = 'var(--color-bg-main)'; 
                }}
                onMouseLeave={(e) => { 
                  if(mode === 'daily' && !isSelectedDaily) e.currentTarget.style.background = 'transparent'; 
                }}
                style={{
                  width: '32px', height: '32px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '8px', cursor: mode === 'daily' ? 'pointer' : 'inherit',
                  fontSize: '0.85rem', fontWeight: isSelectedDaily ? 700 : (isToday ? 600 : 500),
                  color: isSelectedDaily ? '#FFFFFF' : (isToday ? 'var(--color-brand-blue)' : 'var(--color-text-dark)'),
                  background: isSelectedDaily ? 'var(--color-brand-blue)' : 'transparent',
                  boxShadow: isSelectedDaily ? '0 4px 12px rgba(46, 49, 146, 0.3)' : 'none',
                  transition: 'all 0.2s ease',
                  border: isToday && !isSelectedDaily ? '1px solid var(--color-border-light)' : '1px solid transparent'
                }}
              >
                {d}
              </div>
            );
          })}
        </div>
      );
    });
  };

  const renderMonthList = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '200px', overflowY: 'auto', paddingRight: '4px' }}>
        {months.map((m, idx) => (
          <div
            key={m}
            onClick={(e) => { e.stopPropagation(); handleMonthClick(idx); }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-main)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            style={{
              padding: '8px 12px', borderRadius: '8px', cursor: 'pointer',
              fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-dark)',
              transition: 'background 0.2s ease'
            }}
          >
            {m} {currentMonth.getFullYear()}
          </div>
        ))}
      </div>
    );
  };

  // Determine display text based on mode and selectedDate
  let displayText = '';
  if (mode === 'daily') {
    const d = new Date(selectedDate || '2026-07-01');
    displayText = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } else if (mode === 'weekly') {
    displayText = selectedDate || 'Week 2, Jul 2026';
  } else if (mode === 'monthly') {
    if (selectedDate && selectedDate.includes('-')) {
      const parts = selectedDate.split('-');
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 1);
      displayText = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else {
      displayText = selectedDate || 'July 2026';
    }
  }

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Trigger Button - Match User Pill Style exactly */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px', 
          background: '#ffffff', padding: '6px 14px', 
          borderRadius: '24px', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a',
          cursor: 'pointer', border: '1px solid #e2e8f0',
          transition: 'all 0.2s ease',
          boxShadow: isOpen ? 'inset 0 2px 4px rgba(0,0,0,0.02)' : '0 1px 2px rgba(0,0,0,0.02)'
        }}
      >
        <Calendar size={16} color="#0284c7" />
        <span>{displayText}</span>
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
          {/* Header (Years/Months navigation) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.25rem' }}>
            <button 
              onClick={mode === 'monthly' ? (e) => { e.stopPropagation(); setCurrentMonth(new Date(currentMonth.getFullYear() - 1, 0, 1)) } : handlePrevMonth}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '8px', color: 'var(--color-text-muted-dark)', transition: 'background 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-main)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <ChevronLeft size={16} />
            </button>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
              {mode === 'monthly' ? currentMonth.getFullYear() : currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <button 
              onClick={mode === 'monthly' ? (e) => { e.stopPropagation(); setCurrentMonth(new Date(currentMonth.getFullYear() + 1, 0, 1)) } : handleNextMonth}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '8px', color: 'var(--color-text-muted-dark)', transition: 'background 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-main)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Calendar Body depending on mode */}
          {mode !== 'monthly' ? (
            <>
              {/* Days of week header */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', justifyItems: 'center', marginBottom: '4px' }}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-muted-dark)' }}>
                    {day}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {renderCalendarGrid()}
              </div>
            </>
          ) : (
            renderMonthList()
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
