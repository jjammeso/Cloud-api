import 'dotenv/config';
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});


async function seed() {
  await pool.query(`
    INSERT INTO users (name, email) VALUES
    ('Sonam', 'sonam@example.com'),
    ('Alice', 'alice@example.com'),
    ('Bob', 'bob@example.com')
    ON CONFLICT (email) DO NOTHING;
  `);

  await pool.query(`
    INSERT INTO products (name, price) VALUES
    ('Chair', 50),
    ('Table', 120),
    ('Laptop', 1000)
  `);

  console.log("Seeding done");
  process.exit();
}

seed();