export const dailyData = [
  { label: 'Jul 1', YP: 2100, PCL3: 12500, PCL5: 1800, POCL3: 11200 },
  { label: 'Jul 2', YP: 1800, PCL3: 9800,  PCL5: 2400, POCL3: 4500 },
  { label: 'Jul 3', YP: 2900, PCL3: 14200, PCL5: 1500, POCL3: 13500 },
  { label: 'Jul 4', YP: 1500, PCL3: 8600,  PCL5: 2800, POCL3: 0 },
  { label: 'Jul 5', YP: 2400, PCL3: 11500, PCL5: 1900, POCL3: 8400 },
  { label: 'Jul 6', YP: 1200, PCL3: 6400,  PCL5: 1100, POCL3: 2100 },
  { label: 'Jul 7', YP: 2800, PCL3: 13200, PCL5: 2900, POCL3: 14800 },
  { label: 'Jul 8', YP: 2200, PCL3: 10800, PCL5: 2200, POCL3: 9700 },
];

export const weeklyData = [
  { label: 'W1', YP: 14500, PCL3: 72000, PCL5: 12500, POCL3: 45000 },
  { label: 'W2', YP: 11200, PCL3: 58000, PCL5: 9800,  POCL3: 18000 },
  { label: 'W3', YP: 18900, PCL3: 89000, PCL5: 17200, POCL3: 65000 },
  { label: 'W4', YP: 16400, PCL3: 76000, PCL5: 14800, POCL3: 52000 },
  { label: 'W5', YP: 12800, PCL3: 61000, PCL5: 11500, POCL3: 28000 },
  { label: 'W6', YP: 15500, PCL3: 84000, PCL5: 13900, POCL3: 72000 },
  { label: 'W7', YP: 19200, PCL3: 95000, PCL5: 18500, POCL3: 81000 },
  { label: 'W8', YP: 17800, PCL3: 82000, PCL5: 16000, POCL3: 59000 },
];

export const monthlyData = [
  { label: 'Jan', YP: 58000, PCL3: 285000, PCL5: 52000, POCL3: 185000 },
  { label: 'Feb', YP: 62000, PCL3: 310000, PCL5: 58000, POCL3: 215000 },
  { label: 'Mar', YP: 54000, PCL3: 272000, PCL5: 49000, POCL3: 162000 },
  { label: 'Apr', YP: 71000, PCL3: 345000, PCL5: 68000, POCL3: 265000 },
  { label: 'May', YP: 65000, PCL3: 328000, PCL5: 61000, POCL3: 241000 },
  { label: 'Jun', YP: 59000, PCL3: 294000, PCL5: 55000, POCL3: 198000 },
  { label: 'Jul', YP: 78000, PCL3: 382000, PCL5: 75000, POCL3: 310000 },
  { label: 'Aug', YP: 68000, PCL3: 335000, PCL5: 64000, POCL3: 255000 },
];

// Using our new aesthetic chemical color palette
export const productMix = [
  { name: 'PCL3', value: 45, color: 'var(--color-chem-pcl3)' },
  { name: 'PCL5', value: 28, color: 'var(--color-chem-pcl5)' },
  { name: 'POCL3', value: 27, color: 'var(--color-chem-pocl3)' },
];

export const yieldTrend = [
  { month: 'Jan', yield: 88 },
  { month: 'Feb', yield: 91 },
  { month: 'Mar', yield: 87 },
  { month: 'Apr', yield: 93 },
  { month: 'May', yield: 90 },
  { month: 'Jun', yield: 95 },
];

export const recentBatches = [
  { id: 'B-1042', product: 'PCL3', input: '850 kg YP', output: '2,380 kg', yield: '93.2%', status: 'Completed', color: 'var(--color-chem-pcl3)' },
  { id: 'B-1041', product: 'POCL3', input: '620 kg YP', output: '1,740 kg', yield: '91.1%', status: 'Completed', color: 'var(--color-chem-pocl3)' },
  { id: 'B-1040', product: 'PCL5', input: '430 kg YP', output: '1,190 kg', yield: '88.7%', status: 'Completed', color: 'var(--color-chem-pcl5)' },
  { id: 'B-1039', product: 'PCL3', input: '900 kg YP', output: '2,510 kg', yield: '94.1%', status: 'In Progress', color: 'var(--color-chem-pcl3)' },
];

export const colorMap = { PCL3: '#2563EB', PCL5: '#16A34A', POCL3: '#EA580C' };
export const labelFormatters = {
  'W1': 'June · 1st Week', 'W2': 'June · 2nd Week', 'W3': 'June · 3rd Week', 'W4': 'June · 4th Week',
  'W5': 'July · 1st Week', 'W6': 'July · 2nd Week', 'W7': 'July · 3rd Week', 'W8': 'July · 4th Week',
};

// Dynamically generate 8 days of pseudo-realistic daily data
export const getDynamicDailyData = (startDateStr) => {
  const start = new Date(startDateStr);
  const data = [];
  
  // User requested random tonnages for PCL3
  const pcl3Tons = [5, 7, 9, 6, 3, 12];

  for (let i = 0; i < 8; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = d.getDate();
    
    // Deterministic selection so it doesn't flicker on React state re-renders (hover)
    const basePCL3 = pcl3Tons[(day + i) % pcl3Tons.length] * 1000;
    
    const basePCL5 = 300 + (Math.cos(i) * 100);
    const basePOCL3 = 400 + (Math.sin(i * 1.5) * 80);
    
    data.push({
      label: `${month} ${day}`,
      PCL3: basePCL3,
      PCL5: Math.round(basePCL5),
      POCL3: Math.round(basePOCL3)
    });
  }
  return data;
};
