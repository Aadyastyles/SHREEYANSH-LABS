-- YP Purchases
CREATE TABLE IF NOT EXISTS yp_purchases (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    date          TEXT NOT NULL,               -- ISO date
    supplier      TEXT,
    total_tins    INTEGER NOT NULL,
    total_weight  REAL NOT NULL,               -- kg
    rate_per_kg   REAL NOT NULL,               -- ₹
    custom_duty   REAL DEFAULT 0,              -- ₹
    other_charges REAL DEFAULT 0,              -- ₹
    landed_cost_per_kg REAL GENERATED ALWAYS AS (
        (rate_per_kg * total_weight + custom_duty + other_charges) / total_weight
    ) STORED
);

-- Individual tins from a purchase
CREATE TABLE IF NOT EXISTS tins (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    purchase_id     INTEGER REFERENCES yp_purchases(id),
    tin_number      TEXT NOT NULL,              -- e.g., "P001-T01"
    initial_weight  REAL NOT NULL,             -- kg
    remaining_weight REAL NOT NULL,            -- kg (updated on consumption)
    status          TEXT DEFAULT 'Full'        -- Full / Partial / Empty
);

-- Chemicals master
CREATE TABLE IF NOT EXISTS chemicals (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT UNIQUE NOT NULL,           -- PCL3, PCL5, POCL3
    formula     TEXT,                           -- e.g., "PCl₃"
    yield_ratio REAL NOT NULL,                 -- kg YP per 1 kg output
    prod_charge_per_kg REAL DEFAULT 0          -- ₹ production charge
);

-- Production batches
CREATE TABLE IF NOT EXISTS batches (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_code      TEXT UNIQUE NOT NULL,       -- e.g., "B-2026-001"
    date            TEXT NOT NULL,
    chemical_id     INTEGER REFERENCES chemicals(id),
    total_yp_input  REAL NOT NULL,             -- kg consumed
    expected_output REAL NOT NULL,             -- kg
    actual_output   REAL NOT NULL,             -- kg
    yield_pct       REAL GENERATED ALWAYS AS (
        (actual_output / expected_output) * 100
    ) STORED,
    cost_per_kg     REAL                       -- calculated & stored on creation
);

-- Which tins were used in which batch (junction table)
CREATE TABLE IF NOT EXISTS batch_tin_usage (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    batch_id    INTEGER REFERENCES batches(id),
    tin_id      INTEGER REFERENCES tins(id),
    kg_used     REAL NOT NULL                  -- how much drawn from this tin
);

-- Purchase Orders from client
CREATE TABLE IF NOT EXISTS purchase_orders (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    po_number   TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    chemical_id INTEGER REFERENCES chemicals(id),
    qty_kg      REAL NOT NULL,
    date        TEXT NOT NULL,
    target_date TEXT,
    status      TEXT DEFAULT 'Pending'         -- Pending / Fulfilled / Partial
);

-- PO fulfillment: which batches allocated to which PO
CREATE TABLE IF NOT EXISTS po_allocations (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    po_id       INTEGER REFERENCES purchase_orders(id),
    batch_id    INTEGER REFERENCES batches(id),
    kg_allocated REAL NOT NULL,
    cost_per_kg  REAL NOT NULL                 -- from that batch
);

-- Sales Invoices
CREATE TABLE IF NOT EXISTS invoices (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    po_id           INTEGER REFERENCES purchase_orders(id),
    invoice_number  TEXT UNIQUE NOT NULL,
    date            TEXT NOT NULL,
    qty_kg          REAL NOT NULL,
    weighted_cost_per_kg REAL NOT NULL,        -- auto-calculated
    sale_price_per_kg    REAL NOT NULL,
    total_amount    REAL NOT NULL,
    margin_per_kg   REAL GENERATED ALWAYS AS (
        sale_price_per_kg - weighted_cost_per_kg
    ) STORED
);

-- Daily stock snapshots (one row per chemical per day)
CREATE TABLE IF NOT EXISTS daily_stock (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    date            TEXT NOT NULL,
    chemical_id     INTEGER REFERENCES chemicals(id),
    opening_balance REAL NOT NULL,
    produced        REAL DEFAULT 0,
    dispatched      REAL DEFAULT 0,
    wastage         REAL DEFAULT 0,
    closing_balance REAL GENERATED ALWAYS AS (
        opening_balance + produced - dispatched - wastage
    ) STORED,
    UNIQUE(date, chemical_id)
);

-- Daily YP (raw material) snapshots
CREATE TABLE IF NOT EXISTS daily_yp_stock (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    date            TEXT NOT NULL UNIQUE,
    opening_kg      REAL NOT NULL,
    received_kg     REAL DEFAULT 0,
    consumed_kg     REAL DEFAULT 0,
    closing_kg      REAL GENERATED ALWAYS AS (
        opening_kg + received_kg - consumed_kg
    ) STORED,
    full_tins       INTEGER DEFAULT 0,
    partial_tins    INTEGER DEFAULT 0,
    empty_tins      INTEGER DEFAULT 0
);
