const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Conexión exitosa a la base de datos");

    const [rows] = await connection.query("SELECT 1");
    console.log("✅ Consulta de prueba exitosa");

    connection.release();
    return true;
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error.message);
    return false;
  }
}

testConnection();

module.exports = pool;