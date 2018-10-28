const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../../customFunction/Mensajes')


const schema = {
	nombre: Joi.string().required()
}

const fondoBody = req => {
	return {
		nombre: req.body.fondo.nombre.toUpperCase().trim()
	}
}

exports.guardar = (req, res, next) => {
	req.fondo = fondoBody(req)
	const {
		error
	} = Joi.validate(req.fondo, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catFondos.find({
			where: {
				nombre: req.fondo.nombre
			}
		})
			.then(existe => {
				if (existe) {
					res.status(400).json({
						status: 'Alerta',
						msg: 'Ya existe este fondo.'
					})
				} else {
					next()
				}
			})
			.catch((err) => {
				res.status(400).json({
					status: 'fallo',
					msg: 'Conflicto con los datos en la BD',
					error: err
				})
			})
	}
}

exports.actualizar = (req, res, next) => {
	req.fondo = fondoBody(req)
	const {
		error
	} = Joi.validate(req.fondo, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catFondos.find({
			where: {
				nombre: req.fondo.nombre,
				idFondo: {
					[Op.ne]: req.params.id
				}
			}
		})
			.then(existe => {
				if (existe) {
					res.status(400).json({
						status: 'Alerta',
						msg: 'Ya existe este fondo.'
					})
				} else {
					next()
				}
			})
			.catch((err) => {
				res.status(400).json({
					status: 'fallo',
					msg: 'Conflicto con los datos en la BD',
					error: err
				})
			})
	}
}