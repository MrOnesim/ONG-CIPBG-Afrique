import { Pool } from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME || "Administrateur CIPBG";

if (!email || !password) {
  console.error(
    "Usage (PowerShell):\n  $env:ADMIN_EMAIL='admin@cipbgafrique.org'\n  $env:ADMIN_PASSWORD='<12 caracteres minimum>'\n  node scripts/create-admin.mjs",
  );
  process.exit(1);
}

if (password.length < 12) {
  console.error("ADMIN_PASSWORD doit contenir au moins 12 caracteres.");
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL est absente. Lancez-la depuis le shell pour viser la bonne base.");
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

try {
  const hash = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    `INSERT INTO admin_users (email, password_hash, name, role)
     VALUES ($1, $2, $3, 'superadmin')
     ON CONFLICT (email) DO UPDATE
       SET password_hash = EXCLUDED.password_hash,
           name = EXCLUDED.name
     RETURNING id, email, name, role`,
    [email, hash, name],
  );
  console.log(`Admin pret : ${rows[0].email} (id ${rows[0].id}, role ${rows[0].role})`);
} catch (error) {
  console.error("Echec de la creation :", error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
