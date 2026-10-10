// Data-only export of all public tables using the anon key (RLS public-read).
// Usage: node scripts/export-db.mjs
import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Minimal .env parser (no extra deps).
function loadEnv(path) {
  const env = {};
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (m && !line.trimStart().startsWith('#')) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return env;
}

const envPath = existsSync(join(root, '.env')) ? '.env' : '.env.local';
const env = loadEnv(join(root, envPath));
const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;
if (!url || !key) throw new Error(`Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY in ${envPath}`);

const supabase = createClient(url, key);

const TABLES = [
  'opening_hours',
  'menu_categories',
  'menu_items',
  'drink_categories',
  'drink_items',
  'contact_info',
];

const outDir = join(root, 'db-export');
mkdirSync(outDir, { recursive: true });

const combined = {};
let total = 0;

for (const table of TABLES) {
  // Page in case any table exceeds the 1000-row default cap.
  const rows = [];
  const pageSize = 1000;
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('id', { ascending: true })
      .range(from, from + pageSize - 1);
    if (error) {
      console.error(`✗ ${table}: ${error.message}`);
      break;
    }
    rows.push(...data);
    if (data.length < pageSize) break;
  }
  combined[table] = rows;
  total += rows.length;
  writeFileSync(join(outDir, `${table}.json`), JSON.stringify(rows, null, 2));
  console.log(`✓ ${table}: ${rows.length} rows`);
}

writeFileSync(
  join(outDir, '_all.json'),
  JSON.stringify({ exported_at: new Date().toISOString(), source: url, tables: combined }, null, 2)
);
console.log(`\nDone. ${total} rows across ${TABLES.length} tables → ${outDir}`);
