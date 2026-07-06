export const dailyData = [
  { label: 'Jul 1', PCL3: 620, PCL5: 280, POCL3: 410 },
  { label: 'Jul 2', PCL3: 580, PCL5: 310, POCL3: 450 },
  { label: 'Jul 3', PCL3: 710, PCL5: 380, POCL3: 320 },
  { label: 'Jul 4', PCL3: 660, PCL5: 420, POCL3: 390 },
  { label: 'Jul 5', PCL3: 590, PCL5: 340, POCL3: 440 },
  { label: 'Jul 6', PCL3: 640, PCL5: 290, POCL3: 380 },
  { label: 'Jul 7', PCL3: 720, PCL5: 360, POCL3: 420 },
  { label: 'Jul 8', PCL3: 680, PCL5: 400, POCL3: 370 },
];

export const weeklyData = [
  { label: 'W1', PCL3: 4200, PCL5: 1800, POCL3: 2600 },
  { label: 'W2', PCL3: 3800, PCL5: 2100, POCL3: 3100 },
  { label: 'W3', PCL3: 5100, PCL5: 2800, POCL3: 2200 },
  { label: 'W4', PCL3: 4600, PCL5: 3200, POCL3: 2900 },
  { label: 'W5', PCL3: 3900, PCL5: 2400, POCL3: 3400 },
  { label: 'W6', PCL3: 4400, PCL5: 1900, POCL3: 2800 },
  { label: 'W7', PCL3: 5200, PCL5: 2600, POCL3: 3200 },
  { label: 'W8', PCL3: 4800, PCL5: 3000, POCL3: 2700 },
];

export const monthlyData = [
  { label: 'Jan', PCL3: 18200, PCL5: 8400, POCL3: 12100 },
  { label: 'Feb', PCL3: 17800, PCL5: 9100, POCL3: 13500 },
  { label: 'Mar', PCL3: 19100, PCL5: 8800, POCL3: 12200 },
  { label: 'Apr', PCL3: 18600, PCL5: 9200, POCL3: 12900 },
  { label: 'May', PCL3: 17900, PCL5: 8400, POCL3: 13400 },
  { label: 'Jun', PCL3: 19400, PCL5: 8900, POCL3: 12800 },
  { label: 'Jul', PCL3: 20200, PCL5: 9600, POCL3: 14200 },
  { label: 'Aug', PCL3: 19800, PCL5: 9000, POCL3: 13700 },
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
  for (let i = 0; i < 8; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = d.getDate();
    const basePCL3 = 600 + (Math.sin(i) * 100);
    const basePCL5 = 300 + (Math.cos(i) * 100);
    const basePOCL3 = 400 + (Math.sin(i * 1.5) * 80);
    data.push({
      label: `${month} ${day}`,
      PCL3: Math.round(basePCL3),
      PCL5: Math.round(basePCL5),
      POCL3: Math.round(basePOCL3)
    });
  }
  return data;
};
