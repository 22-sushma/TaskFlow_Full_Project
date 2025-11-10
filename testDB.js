import { pool } from './src/config/db.js';

(async () => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    console.log('✅ MySQL Connected! Current time:', rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error('❌ Connection Failed:', err.message);
    process.exit(1);
  }
})();
