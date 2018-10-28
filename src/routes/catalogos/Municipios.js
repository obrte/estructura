// const AuthMiddleware = require('../../middlewares/AuthMiddleware')
const MunicipiosPolicies = require('../../policies/catalogos/MunicipiosPolicies')
const MunicipiosController = require('../../controllers/catalogos/MunicipiosController')

module.exports = (router) => {
	// POST single
	router.post('/municipios', MunicipiosPolicies.guardar, MunicipiosController.guardar)

	// GET all
	router.get('/municipios', MunicipiosController.municipios)

	// GET one by id
	router.get('/municipios/:id', MunicipiosController.municipio)

	// PATCH single
	router.patch('/municipios/:id', MunicipiosPolicies.actualizar, MunicipiosController.actualizar)

	// DELETE single
	router.delete('/municipios/:id', MunicipiosController.eliminar)
}