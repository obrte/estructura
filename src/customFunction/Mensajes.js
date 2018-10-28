const switchError = (error, res) => {
	switch (error.details[0].context.key) {
	case 'activo':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar el campo activo.'
		})
		break
	case 'comentarios':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar comentarios.'
		})
		break
	case 'descripcion':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar la descripcion.'
		})
		break
	case 'ejercicio':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar el ejercicio.'
		})
		break
	case 'email':
		res.status(400).json({
			status: 'error',
			msg: 'Debe introducir un correo.'
		})
		break
	case 'idLocalidad':
		res.status(400).json({
			status: 'error',
			msg: 'Debe introducir el idLocalidad.'
		})
		break
	case 'idFondo':
		res.status(400).json({
			status: 'error',
			msg: 'Debe introducir el Fondo.'
		})
		break
	case 'idOficio':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar id del Oficio.'
		})
		break
	case 'idUsuario':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar id del Usuario.'
		})
		break
	case 'monto':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar monto.'
		})
		break
	case 'nombre':
		res.status(400).json({
			status: 'error',
			msg: 'Debe introducir un nombre.'
		})
		break
	case 'numero':
		res.status(400).json({
			status: 'error',
			msg: 'Debe proporcionar el numero.'
		})
		break
	case 'password':
		res.status(400).json({
			status: 'error',
			msg: 'Debe introducir un password valido.'
		})
		break
	case 'rePassword':
		res.status(400).json({
			status: 'error',
			msg: 'Las contraseñas no coinciden.'
		})
		break
	default:
		res.status(500).json({
			status: 'error',
			msg: 'No se encontraron un caso para este error.'
		})
		break
	}
}

const mensajes = {}

mensajes.switchError = switchError

module.exports = mensajes