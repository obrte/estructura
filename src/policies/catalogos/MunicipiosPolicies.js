const Joi = require('joi')
const db = require('../../config/db')
const Op = db.Sequelize.Op
const mensajes = require('../../customFunction/Mensajes')


const schema = {
	nombre: Joi.string().required()
}

const municipioBody = req => {
	return {
		nombre: req.body.municipio.nombre.toUpperCase().trim()
	}
}

exports.guardar = (req, res, next) => {
	req.municipio = municipioBody(req)
	const {
		error
	} = Joi.validate(req.municipio, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catMunicipios.find({
			where: {
				nombre: req.municipio.nombre
			}
		})
			.then(existe => {
				if (existe) {
					res.status(400).json({
						status: 'Alerta',
						msg: 'Ya existe este municipio.'
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
	req.municipio = municipioBody(req)
	const {
		error
	} = Joi.validate(req.municipio, schema)
	if (error) {
		mensajes.switchError(error, res)
	} else {
		db.catMunicipios.find({
			where: {
				nombre: req.municipio.nombre,
				idMunicipio: {
					[Op.ne]: req.params.id
				}
			}
		})
			.then(existe => {
				if (existe) {
					res.status(400).json({
						status: 'Alerta',
						msg: 'Ya existe este municipio.'
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