import fs from 'fs';
import path from 'path';
import db from './db.js';

const migrationsDir = path.join(process.cwd(), 'migrations');
const migrationFile = path.join(migrationsDir, '001-add-activo-to-workers.sql');

function runMigration() {
  if (!fs.existsSync(migrationFile)) {
    console.error('Migration file not found:', migrationFile);
    process.exit(1);
  }

  const sql = fs.readFileSync(migrationFile, 'utf8');

  // Split statements by semicolon (simple approach)
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  (async () => {
    try {
      for (const stmt of statements) {
        console.log('Executing:', stmt.slice(0, 80));
        await new Promise((resolve, reject) => {
          db.query(stmt, (err, res) => {
            if (err) return reject(err);
            resolve(res);
          });
        });
      }

      console.log('Migration completed successfully.');
      process.exit(0);
    } catch (err) {
      console.error('Migration failed:', err.message || err);
      process.exit(1);
    }
  })();
}

runMigration();
