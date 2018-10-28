const db = require('../../config/db')
// const Op = db.Sequelize.Op
const buscar = require('../../customFunction/Buscar')
// var valido = false

//POST single
exports.guardar = (req, res) => {
	db.catMunicipios.create(req.municipio)
		.then(municipio => {
			buscar.municipio(municipio.idMunicipio)
				.then(datosMunicipio => {
					res.status(201).json(datosMunicipio)
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
exports.municipios = (req, res) => {
	db.catMunicipios.findAll({
		attributes: [
			'nombre',
			'created_at',
			'updated_at'
		],
		include: [{
			model: db.catLocalidades,
			attributes: ['idLocalidad', 'nombre'],
			as: 'localidades'
		}]
	})
		.then(municipios => {
			res.status(200).json(municipios)
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
exports.municipio = (req, res) => {
	buscar.municipio(req.params.id)
		.then(datosMunicipio => {
			res.status(200).json(datosMunicipio)
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
	db.catMunicipios.update(req.municipio, {
		where: {
			idMunicipio: req.params.id
		}
	})
		.then(municipioActualizado => {
			if (municipioActualizado > 0) {
				buscar.municipio(req.params.id)
					.then(datosMunicipio => {
						res.status(200).json(datosMunicipio)
					})
			} else {
				res.status(400).json({
					status: 'Alerta',
					msg: 'Municipio no actualizado.'
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
	db.catMunicipios.destroy({
		where: {
			idMunicipio: req.params.id
		}
	})
		.then(municipioEliminado => {
			if (municipioEliminado == 1) {
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