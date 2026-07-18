// OUTBOUND POs: Finished Goods Sold (Client is usually SCIMPLIFY, but End Party is the final destination)
export const outboundPOs = [
  {
    po: 'PO-FG-2026-341',
    client: 'SCIMPLIFY',
    endParty: 'Meghmani Organics',
    product: 'PCL3',
    qty: 2500,
    rate: 320,
    total: 800000,
    dispatchDate: '22 Jun 2026',
    status: 'Dispatched',
    allocatedBatches: ['B-2406-01', 'B-2406-02'], // Shows split fulfillment
  },
  {
    po: 'PO-FG-2026-342',
    client: 'SCIMPLIFY',
    endParty: 'Aarti Industries',
    product: 'POCL3',
    qty: 1800,
    rate: 285,
    total: 513000,
    dispatchDate: '24 Jun 2026',
    status: 'Dispatched',
    allocatedBatches: ['B-2406-03'],
  },
  {
    po: 'PO-FG-2026-343',
    client: 'SCIMPLIFY',
    endParty: 'UPL Ltd',
    product: 'PCL5',
    qty: 900,
    rate: 510,
    total: 459000,
    dispatchDate: '25 Jun 2026',
    status: 'Processing',
    allocatedBatches: ['B-2406-04'],
  },
  {
    po: 'PO-FG-2026-344',
    client: 'SCIMPLIFY',
    endParty: 'Meghmani Organics',
    product: 'PCL3',
    qty: 3200,
    rate: 320,
    total: 1024000,
    dispatchDate: '28 Jun 2026',
    status: 'Pending',
    allocatedBatches: [],
  },
  {
    po: 'PO-FG-2026-339',
    client: 'SCIMPLIFY',
    endParty: 'Shree Pushkar Chemicals',
    product: 'PCL3',
    qty: 2000,
    rate: 318,
    total: 636000,
    dispatchDate: '18 Jun 2026',
    status: 'Overdue',
    allocatedBatches: ['B-2406-05'],
  },
];

// INBOUND POs: Raw Materials bought from SCIMPLIFY
export const inboundPOs = [
  {
    po: 'PO-RM-2026-101',
    supplier: 'SCIMPLIFY',
    material: 'Yellow Phosphorus (YP)',
    qty: 450,
    baseRate: 295,
    liaisoningFee: 17, // Per kg
    totalValue: (295 + 17) * 450,
    receiveDate: '02 Jun 2026',
    status: 'Received',
  },
  {
    po: 'PO-RM-2026-102',
    supplier: 'SCIMPLIFY',
    material: 'Carboys Drums',
    qty: 1200, // units
    baseRate: 150,
    liaisoningFee: 0,
    totalValue: 150 * 1200,
    receiveDate: '05 Jun 2026',
    status: 'Received',
  },
  {
    po: 'PO-RM-2026-103',
    supplier: 'SCIMPLIFY',
    material: 'Coal',
    qty: 5000,
    baseRate: 45,
    liaisoningFee: 2,
    totalValue: 47 * 5000,
    receiveDate: '12 Jun 2026',
    status: 'Pending',
  },
  {
    po: 'PO-RM-2026-104',
    supplier: 'SCIMPLIFY',
    material: 'Yellow Phosphorus (YP)',
    qty: 850,
    baseRate: 298,
    liaisoningFee: 15,
    totalValue: (298 + 15) * 850,
    receiveDate: '18 Jun 2026',
    status: 'Processing',
  }
];

// Keeping for compatibility if RevenueChart uses it, otherwise update safely
export const purchaseOrders = outboundPOs; 

export const revenueByProduct = [
  { month: 'Jan', PCL3: 6.2, PCL5: 3.8, POCL3: 4.1 },
  { month: 'Feb', PCL3: 7.1, PCL5: 4.2, POCL3: 3.6 },
  { month: 'Mar', PCL3: 5.8, PCL5: 5.1, POCL3: 4.8 },
  { month: 'Apr', PCL3: 8.4, PCL5: 4.6, POCL3: 5.2 },
  { month: 'May', PCL3: 7.6, PCL5: 3.9, POCL3: 5.8 },
  { month: 'Jun', PCL3: 9.2, PCL5: 5.4, POCL3: 4.0 },
];

export const clientLedger = [
  { name: 'Meghmani Organics', outstanding: '₹4,82,000', lastPayment: '18 Jun 2026' },
  { name: 'Aarti Industries', outstanding: '₹2,15,600', lastPayment: '12 Jun 2026' },
  { name: 'UPL Ltd', outstanding: '₹1,08,400', lastPayment: '20 Jun 2026' },
  { name: 'Shree Pushkar Chemicals', outstanding: '₹6,36,000', lastPayment: '28 May 2026' },
];
