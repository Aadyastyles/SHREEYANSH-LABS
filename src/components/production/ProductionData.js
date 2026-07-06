import { FlaskConical, Weight, TrendingUp, CalendarDays, CircleDot, Clock, Hourglass } from 'lucide-react';

export const stats = [
  { label: 'Active Batches', value: '3', icon: FlaskConical, accent: 'rgba(20, 221, 60, 0.08)' },
  { label: "Today's Output", value: '4,200', unit: 'kg', icon: Weight, accent: 'rgba(20, 221, 60, 0.08)' },
  { label: 'Avg Yield', value: '92.4', unit: '%', icon: TrendingUp, accent: 'rgba(20, 221, 60, 0.08)' },
  { label: 'Batches This Month', value: '28', icon: CalendarDays, accent: 'rgba(74, 144, 217, 0.08)' },
];

export const batches = [
  { id: 'B-1048', date: '25 Jun 2026', product: 'PCL3',  ypInput: 920,  output: 2576, yield: 93.1, duration: '6h 20m', operator: 'Ramesh K.',   status: 'Completed' },
  { id: 'B-1047', date: '25 Jun 2026', product: 'POCL3', ypInput: 780,  output: 2184, yield: 91.8, duration: '5h 45m', operator: 'Sunil M.',    status: 'Completed' },
  { id: 'B-1046', date: '24 Jun 2026', product: 'PCL5',  ypInput: 540,  output: 1490, yield: 88.4, duration: '7h 10m', operator: 'Prakash D.',   status: 'Completed' },
  { id: 'B-1045', date: '24 Jun 2026', product: 'PCL3',  ypInput: 860,  output: 2408, yield: 94.2, duration: '4h 50m', operator: 'Ajay S.',      status: 'In Progress' },
  { id: 'B-1044', date: '23 Jun 2026', product: 'POCL3', ypInput: 650,  output: 1820, yield: 90.5, duration: '5h 30m', operator: 'Ramesh K.',   status: 'Completed' },
  { id: 'B-1043', date: '23 Jun 2026', product: 'PCL5',  ypInput: 480,  output: 1315, yield: 87.9, duration: '6h 55m', operator: 'Vikram P.',   status: 'In Progress' },
  { id: 'B-1042', date: '22 Jun 2026', product: 'PCL3',  ypInput: 850,  output: 2380, yield: 93.2, duration: '5h 15m', operator: 'Sunil M.',    status: 'Completed' },
  { id: 'B-1041', date: '22 Jun 2026', product: 'POCL3', ypInput: 700,  output: 1950, yield: 92.6, duration: '6h 05m', operator: 'Prakash D.',   status: 'Pending' },
];

export const yieldByProduct = [
  { batch: 'B-1048', PCL3: 93.1, PCL5: null,  POCL3: null  },
  { batch: 'B-1047', PCL3: null,  PCL5: null,  POCL3: 91.8 },
  { batch: 'B-1046', PCL3: null,  PCL5: 88.4, POCL3: null  },
  { batch: 'B-1045', PCL3: 94.2, PCL5: null,  POCL3: null  },
  { batch: 'B-1044', PCL3: null,  PCL5: null,  POCL3: 90.5 },
  { batch: 'B-1043', PCL3: null,  PCL5: 87.9, POCL3: null  },
];

export const timelineEntries = [
  { id: 'B-1048', product: 'PCL3',  time: '12:40 PM', output: '2,576 kg', color: '#14DD3C' },
  { id: 'B-1047', product: 'POCL3', time: '11:15 AM', output: '2,184 kg', color: '#B4FAB8' },
  { id: 'B-1046', product: 'PCL5',  time: '09:30 AM', output: '1,490 kg', color: '#3BA55C' },
  { id: 'B-1045', product: 'PCL3',  time: 'Yesterday 4:50 PM', output: '2,408 kg', color: '#14DD3C' },
  { id: 'B-1044', product: 'POCL3', time: 'Yesterday 11:20 AM', output: '1,820 kg', color: '#B4FAB8' },
];

export const statusConfig = {
  'Completed':   { cls: 'badge badge-green',  icon: CircleDot },
  'In Progress': { cls: 'badge badge-yellow', icon: Clock },
  'Pending':     { cls: 'badge badge-blue',   icon: Hourglass },
};

export const productColors = {
  PCL3:  { bg: 'rgba(20, 221, 60, 0.10)',  color: '#14DD3C' },
  PCL5:  { bg: 'rgba(59, 165, 92, 0.12)',  color: '#3BA55C' },
  POCL3: { bg: 'rgba(180, 250, 184, 0.25)', color: '#2D8B4E' },
};
