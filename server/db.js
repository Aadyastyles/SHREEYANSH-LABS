import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Connect to SQLite database
const dbPath = path.join(dataDir, 'kspl.db');
const db = new Database(dbPath, { verbose: console.log });

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize schema if not exists
const schemaPath = path.join(__dirname, 'schema.sql');
const schemaSql = fs.readFileSync(schemaPath, 'utf8');
db.exec(schemaSql);

// Seed basic data if empty
const chemicalsCount = db.prepare('SELECT COUNT(*) as count FROM chemicals').get();
if (chemicalsCount.count === 0) {
  const insertChemical = db.prepare('INSERT INTO chemicals (name, formula, yield_ratio, prod_charge_per_kg) VALUES (?, ?, ?, ?)');
  insertChemical.run('PCL3', 'PCl₃', 4.25, 0);
  insertChemical.run('PCL5', 'PCl₅', 1.0, 0); // Placeholder yield
  insertChemical.run('POCL3', 'POCl₃', 1.0, 0); // Placeholder yield
}

export default db;
