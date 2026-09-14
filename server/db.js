import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://ze:zecorretora2026@db:5432/corretora',
});

export default pool;
