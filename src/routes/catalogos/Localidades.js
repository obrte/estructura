// const AuthMiddleware = require('../../middlewares/AuthMiddleware')
const LocalidadesPolicies = require('../../policies/catalogos/LocalidadesPolicies')
const LocalidadesController = require('../../controllers/catalogos/LocalidadesController')

module.exports = (router) => {
	// POST single
	router.post('/localidades', LocalidadesPolicies.guardar, LocalidadesController.guardar)

	// GET all
	router.get('/localidades', LocalidadesController.localidades)

	// GET one by id
	router.get('/localidades/:id', LocalidadesController.localidad)

	// PATCH single
	router.patch('/localidades/:id', LocalidadesPolicies.actualizar, LocalidadesController.actualizar)

	// DELETE single
	router.delete('/localidades/:id', LocalidadesController.eliminar)
}