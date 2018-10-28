const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../../customFunction/Mensajes')


const schema = {
	idMunicipio: Joi.number().required(),
	nombre: Joi.string().required()
}

const localidadBody = req => {
	return {
		idMunicipio: req.body.localidad.idMunicipio.trim(),
		nombre: req.body.localidad.nombre.toUpperCase().trim()
	}
}

exports.guardar = (req, res, next) => {
	req.localidad = localidadBody(req)
	const {
		error
	} = Joi.validate(req.localidad, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catLocalidades.find({
			where: {
				idMunicipio: req.localidad.idMunicipio,
				nombre: req.localidad.nombre
			}
		})
			.then(existe => {
				if (existe) {
					res.status(400).json({
						status: 'Alerta',
						msg: 'Ya existe esta localidad en este municipio.'
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
	req.localidad = localidadBody(req)
	const {
		error
	} = Joi.validate(req.localidad, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catLocalidades.find({
			where: {
				idMunicipio: req.localidad.idMunicipio,
				nombre: req.localidad.nombre,
				idLocalidad: {
					[Op.ne]: req.params.id
				}
			}
		})
			.then(existe => {
				if (existe) {
					res.status(400).json({
						status: 'Alerta',
						msg: 'Ya existe esta localidad en este municipio.'
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