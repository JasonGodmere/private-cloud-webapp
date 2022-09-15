import express from 'express'
const app = express()
const port = 3000

import { db } from './db/index.js'

app.use(express.static('public'))

app.get('/instances', (req, res, next) => {
	db.query('SELECT * FROM instances', (err, result) => {
		if (err) {
			return next(err)
		}
		res.send(result.rows)
	})
})

app.post('/instances', (req, res, next) => {
	let query = { 
		text: "INSERT INTO instances(status) VALUES ($1)",
		values: ['starting']
	}
	db.query(query, (err, result) => {
		if (err) {
			return next(err)
		}
		res.send(result);
	})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
