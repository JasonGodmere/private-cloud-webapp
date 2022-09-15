import pg from 'pg';

// pools will use environment variables
// for connecting information
export const db = new pg.Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'mydb',
	password: 'password',
	port: 5432,
})
