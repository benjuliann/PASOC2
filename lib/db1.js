import mysql from "mysql2/promise";

let pool;

if (!global.mysqlPool) {
  global.mysqlPool = mysql.createPool(process.env.DATABASE_URL);
}

pool = global.mysqlPool;

export default pool;