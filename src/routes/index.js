const routes = [
	require('./catalogos/Usuarios'),
	require('./catalogos/Municipios'),
	require('./catalogos/Localidades'),
	require('./Auth')
]
// Add access to the app and db objects to each route
module.exports = function router(app) {
	return routes.forEach(route => {
		route(app)
	})
}