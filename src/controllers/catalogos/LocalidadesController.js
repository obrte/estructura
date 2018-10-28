const db = require('../../config/db')
// const Op = db.Sequelize.Op
const buscar = require('../../customFunction/Buscar')
// var valido = false

//POST single
exports.guardar = (req, res) => {
	db.catLocalidades.create(req.localidad)
		.then(localidad => {
			buscar.localidad(localidad.idLocalidad)
				.then(datosLocalidad => {
					res.status(201).json(datosLocalidad)
				})
		})
		.catch((err) => {
			res.status(400).json({
				status: 'error',
				msg: 'Error al crear',
				error: err
			})
		})
}

// GET all
exports.localidades = (req, res) => {
	db.catLocalidades.findAll({
		attributes: [
			'idLocalidad',
			'nombre',
			'created_at',
			'updated_at'
		],
		include: [{
			model: db.catMunicipios,
			attributes: ['idMunicipio', 'nombre'],
			as: 'municipio'
		}]
	})
		.then(localidades => {
			res.status(200).json(localidades)
		})
		.catch((err) => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al buscar',
				error: err
			})
		})
}

// GET one por id
exports.localidad = (req, res) => {
	buscar.localidad(req.params.id)
		.then(datosLocalidad => {
			res.status(200).json(datosLocalidad)
		})
		.catch((err) => {
			res.status(400).json({
				status: 'error',
				msg: 'Error al buscar',
				error: err
			})
		})
}

// PATCH single
exports.actualizar = (req, res) => {
	db.catLocalidades.update(req.localidad, {
		where: {
			idLocalidad: req.params.id
		}
	})
		.then(localidadActualizada => {
			if (localidadActualizada > 0) {
				buscar.localidad(req.params.id)
					.then(datosLocalidad => {
						res.status(200).json(datosLocalidad)
					})
			} else {
				res.status(400).json({
					status: 'Alerta',
					msg: 'Usuario no actualizado.'
				})
			}
		})
		.catch((err) => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Fallo al actualizar',
				error: err
			})
		})
}

// DELETE single
exports.eliminar = (req, res) => {
	db.catLocalidades.destroy({
		where: {
			idLocalidad: req.params.id
		}
	})
		.then(localidadEliminada => {
			if (localidadEliminada == 1) {
				res.status(200).json({
					status: 'success',
					msg: 'Eliminación exitosa'
				})
			} else {
				res.status(400).json({
					status: 'Alerta',
					msg: 'No encontrado'
				})
			}
		})
		.catch((err) => {
			res.status(400).json({
				status: 'Alerta',
				msg: 'Error al eliminar, verifica que no tenga dependencias',
				error: {
					name: err.name,
					code: err.parent.code
				}
			})
		})
}