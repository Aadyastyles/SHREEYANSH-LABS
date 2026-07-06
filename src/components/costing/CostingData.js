export const productCosting = [
  {
    product: 'PCL3',
    ypRate: 285,
    conversionCost: 42,
    totalCost: 327,
    sellingPrice: 510,
    margin: 35.9,
  },
  {
    product: 'PCL5',
    ypRate: 285,
    conversionCost: 68,
    totalCost: 353,
    sellingPrice: 485,
    margin: 27.2,
  },
  {
    product: 'POCL3',
    ypRate: 285,
    conversionCost: 55,
    totalCost: 340,
    sellingPrice: 620,
    margin: 45.2,
  },
];

export const costTrendData = [
  { month: 'Jan', PCL3: 318, PCL5: 342, POCL3: 330 },
  { month: 'Feb', PCL3: 322, PCL5: 348, POCL3: 335 },
  { month: 'Mar', PCL3: 315, PCL5: 345, POCL3: 328 },
  { month: 'Apr', PCL3: 330, PCL5: 356, POCL3: 342 },
  { month: 'May', PCL3: 325, PCL5: 350, POCL3: 338 },
  { month: 'Jun', PCL3: 327, PCL5: 353, POCL3: 340 },
];

export const productColors = {
  PCL3: '#14DD3C',
  PCL5: '#3BA55C',
  POCL3: '#B4FAB8',
};

export const getMarginBadge = (margin) => {
  if (margin >= 30) return 'badge badge-green';
  if (margin >= 20) return 'badge badge-yellow';
  return 'badge badge-red';
};

export const getMarginLabel = (margin) => {
  if (margin >= 30) return 'Healthy';
  if (margin >= 20) return 'Moderate';
  return 'Low';
};

export const getProgressColor = (margin) => {
  if (margin >= 30) return 'var(--color-primary)';
  if (margin >= 20) return 'var(--color-warning)';
  return 'var(--color-danger)';
};
