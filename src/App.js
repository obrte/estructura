const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./routes/index')
const http = require('http').Server(app)
app.http = http
const PORT = process.env.PORT || 3000
// const AuthMiddleware = require('./middlewares/AuthMiddleware')

/*
 ! CONECCION A LA DB
*/
const db = require('./config/db')
//prueba de conección
db.conn
	.authenticate()
	.then(() => {
		console.log('Connection successfully.')
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err)
	})

db.conn.sync({
	logging: false
}).then(() => {
	db.catUsuarios.findOrCreate({
		where: {
			tipo: 'superadmin'
		},
		defaults: {
			nombre: 'SUPER ADMINISTRADOR INICIAL',
			email: 'super@admin.com',
			//pwd = 12345678
			password: '$2b$10$aBtwvgBEu6ccruaOIbPR9u12ZLCE18McMo.CWgfhxU4ZvYTOujEpq'
		}
	})
		.then((existe, creado) => {
			if (creado) {
				console.log('SUPERADMIN inicial Creado')
			} else {
				console.log('SUPERADMIN ya existe')
			}

		})
	console.log('Sync successfully...')
})

/*
 ! OPCIONES DE APP
*/
app.set('port', PORT)

/*
 ! MIDDLEWARES
*/
var corsOptions = {
	origin: 'http://localhost:8080',
	optionsSuccessStatus: 200,
	credentials: true
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())

// app.use('/:token/public', AuthMiddleware.tokenUrl, express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))

/*
 ! RUTAS
*/
router(app, db)

module.exports = app