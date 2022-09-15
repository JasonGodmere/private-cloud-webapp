const { Pool, Client } = require('pg')

// pools will use environment variables
// for connecting information
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'mydb',
	password: 'password',
	port: 5432,
})

pool.query('SELECT NOW()', (err, res) => {
	console.log(err, res)
	pool.end()
})

// clients will also use environment variables
// for connection information
const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'mydb',
	password: 'password',
	port: 5432,
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
	console.log(err, res)
	client.end()
})
