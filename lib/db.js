import "server-only";
import mysql from "mysql2/promise";

const globalForDb = globalThis;

function getPool() {
	if (!globalForDb.mysqlPool) {
		globalForDb.mysqlPool = mysql.createPool({
			host: process.env.MYSQL_HOST,
			port: Number(process.env.MYSQL_PORT ?? 3306),
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE,
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0,
		});
	}

	return globalForDb.mysqlPool;
}

export async function query(sql, values = []) {
	const pool = getPool();
	const [rows] = await pool.execute(sql, values);
	return rows;
}
