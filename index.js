import express from 'express'
const app = express()
const port = 3000

import { db } from './db/index.js'

app.use(express.static('public'))

app.get('/instances', (req, res, next) => {
	let query = 'SELECT * FROM instances';
	db.query(query, (err, result) => {
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

app.delete('/instances/:id', (req, res, next) => {
	let query = {
		text: 'DELETE FROM instances WHERE id = $1',
		values: [req.params.id]
	};
	db.query(query, (err, result) => {
		if (err) {
			return next(err);
		}
		res.send(result);
	})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
