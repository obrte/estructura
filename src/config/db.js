/*
 ! CONECCION A LA DB
 ! USANDO MySQL-Sequalize
*/
const Sequelize = require('sequelize')
const conn = new Sequelize('contratos', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
	operatorsAliases: false,
	logging: false,
	define: {
		charset: 'utf8',
		collate: 'utf8_general_ci'
	},
	timezone: '-07:00',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})

//Objeto db que contendrá todos los modelos/tablas de la Base de Datos
const db = {}

db.Sequelize = Sequelize
db.conn = conn

//modelos
db.catUsuarios = require('../models/catalogos/Usuarios')(conn, Sequelize)
db.catMunicipios = require('../models/catalogos/Municipios')(conn, Sequelize)
db.catLocalidades = require('../models/catalogos/Localidades')(conn, Sequelize)
db.catFondos = require('../models/catalogos/Fondos')(conn, Sequelize)



//! Asociaciones
Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

module.exports = db