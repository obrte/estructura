const db = require('../config/db')
//const Op = db.Sequelize.Op

//Regresa todos los datos del ID encontrado
const usuario = id => {
	return new Promise((resolve, reject) => {
		db.catUsuarios.find({
			where: {
				idUsuario: id
			},
			attributes: [
				'idUsuario',
				'tipo',
				'permisos',
				'nombre',
				'email',
				'activo',
				'created_at',
				'updated_at'
			]
		})
			.then(datos => {
				if (datos) {
					resolve(datos)
				} else {
					resolve(false)
				}
			})
			.catch(err => reject(err))
	})
}

const municipio = id => {
	return new Promise((resolve, reject) => {
		db.catMunicipios.find({
			where: {
				idMunicipio: id
			},
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
			.then(datos => {
				if (datos) {
					resolve(datos)
				} else {
					resolve(false)
				}
			})
			.catch(err => reject(err))
	})
}

const localidad = id => {
	return new Promise((resolve, reject) => {
		db.catLocalidades.find({
			where: {
				idLocalidad: id
			},
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
			.then(datos => {
				if (datos) {
					resolve(datos)
				} else {
					resolve(false)
				}
			})
			.catch(err => reject(err))
	})
}


const buscar = {}

buscar.usuario = usuario
buscar.municipio = municipio
buscar.localidad = localidad

module.exports = buscar