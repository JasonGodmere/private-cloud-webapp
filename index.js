import express from 'express'
const app = express()
const port = 3000

import { db } from './db/index.js'

app.use(express.static('public'))

app.get('/instances', (req, res, next) => {
	db.query('SELECT * FROM instances', (err, result) => {
		if (err) {
			next(err)
		}
		console.log(result.rows);
		res.send(result.rows)
	})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
