import express from 'express';
import db from './db.js';
const router = express.Router();

/**
 * --- CHEMICALS ---
 */
router.get('/chemicals', (req, res) => {
  const chemicals = db.prepare('SELECT * FROM chemicals').all();
  res.json(chemicals);
});

router.put('/chemicals/:id', (req, res) => {
  const { yield_ratio, prod_charge_per_kg } = req.body;
  const stmt = db.prepare('UPDATE chemicals SET yield_ratio = ?, prod_charge_per_kg = ? WHERE id = ?');
  stmt.run(yield_ratio, prod_charge_per_kg, req.params.id);
  res.json({ success: true });
});

/**
 * --- YP PURCHASES ---
 */
router.get('/purchases', (req, res) => {
  const purchases = db.prepare('SELECT * FROM yp_purchases ORDER BY date DESC').all();
  res.json(purchases);
});

router.post('/purchases', (req, res) => {
  const { date, supplier, total_tins, total_weight, rate_per_kg, custom_duty, other_charges } = req.body;
  
  const insertPurchase = db.prepare(`
    INSERT INTO yp_purchases (date, supplier, total_tins, total_weight, rate_per_kg, custom_duty, other_charges)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  const insertTin = db.prepare(`
    INSERT INTO tins (purchase_id, tin_number, initial_weight, remaining_weight)
    VALUES (?, ?, ?, ?)
  `);

  const transaction = db.transaction(() => {
    const info = insertPurchase.run(date, supplier, total_tins, total_weight, rate_per_kg, custom_duty, other_charges);
    const purchaseId = info.lastInsertRowid;
    
    // Create individual tins
    const weightPerTin = total_weight / total_tins;
    for (let i = 1; i <= total_tins; i++) {
      const tinNumber = `P${purchaseId}-T${i.toString().padStart(3, '0')}`;
      insertTin.run(purchaseId, tinNumber, weightPerTin, weightPerTin);
    }
    return purchaseId;
  });

  const id = transaction();
  res.json({ id, success: true });
});

router.get('/tins', (req, res) => {
  const tins = db.prepare(`
    SELECT t.*, p.landed_cost_per_kg 
    FROM tins t 
    JOIN yp_purchases p ON t.purchase_id = p.id
    WHERE t.status != 'Empty'
  `).all();
  res.json(tins);
});

/**
 * --- PRODUCTION BATCHES ---
 */
router.get('/batches', (req, res) => {
  const batches = db.prepare(`
    SELECT b.*, c.name as chemical_name 
    FROM batches b
    JOIN chemicals c ON b.chemical_id = c.id
    ORDER BY date DESC
  `).all();
  res.json(batches);
});

// Create a batch and calculate weighted cost
router.post('/batches', (req, res) => {
  const { date, chemical_id, actual_output, tins_used } = req.body; 
  // tins_used format: [{ tin_id: 1, kg_used: 50 }, ...]

  const getTin = db.prepare('SELECT remaining_weight, landed_cost_per_kg FROM tins JOIN yp_purchases ON tins.purchase_id = yp_purchases.id WHERE tins.id = ?');
  const updateTin = db.prepare('UPDATE tins SET remaining_weight = ?, status = ? WHERE id = ?');
  const getChemical = db.prepare('SELECT yield_ratio, prod_charge_per_kg FROM chemicals WHERE id = ?');
  
  const insertBatch = db.prepare(`
    INSERT INTO batches (batch_code, date, chemical_id, total_yp_input, expected_output, actual_output, cost_per_kg)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  const insertBatchTin = db.prepare('INSERT INTO batch_tin_usage (batch_id, tin_id, kg_used) VALUES (?, ?, ?)');

  const transaction = db.transaction(() => {
    let totalYpInput = 0;
    let totalTinCost = 0;
    
    // Process tins
    for (const usage of tins_used) {
      const tin = getTin.get(usage.tin_id);
      if (tin.remaining_weight < usage.kg_used) throw new Error(`Not enough weight in tin ${usage.tin_id}`);
      
      totalYpInput += usage.kg_used;
      totalTinCost += (usage.kg_used * tin.landed_cost_per_kg);
      
      const newWeight = tin.remaining_weight - usage.kg_used;
      const status = newWeight <= 0 ? 'Empty' : 'Partial';
      updateTin.run(newWeight, status, usage.tin_id);
    }

    const chemical = getChemical.get(chemical_id);
    const expectedOutput = totalYpInput / chemical.yield_ratio;
    
    // Costing Engine Logic
    // Batch Cost/kg = (Σ each tin's kg_used × that tin's landed_cost/kg) / Actual Output + Production Charge/kg
    const costPerKg = (totalTinCost / actual_output) + chemical.prod_charge_per_kg;

    // Generate Batch Code
    const datePrefix = new Date(date).getFullYear();
    const countQuery = db.prepare(`SELECT COUNT(*) as c FROM batches WHERE date LIKE '${datePrefix}%'`).get();
    const batchCode = `B-${datePrefix}-${(countQuery.c + 1).toString().padStart(3, '0')}`;

    const batchInfo = insertBatch.run(batchCode, date, chemical_id, totalYpInput, expectedOutput, actual_output, costPerKg);
    const batchId = batchInfo.lastInsertRowid;

    for (const usage of tins_used) {
      insertBatchTin.run(batchId, usage.tin_id, usage.kg_used);
    }
    
    return batchId;
  });

  try {
    const batchId = transaction();
    res.json({ id: batchId, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * --- PO & SALES ---
 */
router.get('/pos', (req, res) => {
  const pos = db.prepare(`
    SELECT p.*, c.name as chemical_name 
    FROM purchase_orders p
    JOIN chemicals c ON p.chemical_id = c.id
    ORDER BY date DESC
  `).all();
  res.json(pos);
});

router.post('/pos', (req, res) => {
  const { po_number, client_name, chemical_id, qty_kg, date, target_date } = req.body;
  const stmt = db.prepare(`
    INSERT INTO purchase_orders (po_number, client_name, chemical_id, qty_kg, date, target_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(po_number, client_name, chemical_id, qty_kg, date, target_date);
  res.json({ id: info.lastInsertRowid, success: true });
});

// More routes like allocating POs, Invoicing, Daily Stock can be added here
// following the exact textbook logic described in the implementation plan.

export default router;
