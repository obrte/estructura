module.exports = (sequelize, DataTypes) => {
	const catUsuarios = sequelize.define('catUsuarios', {
		idUsuario: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			primaryKey: true
		},
		tipo: {
			type: DataTypes.STRING(25),
			allowNull: false
		},
		permisos: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		nombre: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		activo: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 1
		},
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	}, {
		paranoid: false,
		underscored: true
	})
	//! Asociaciones
	// catUsuarios.associate = function (db) {
	// 	catUsuarios.belongsTo(db.catOrganizaciones, {
	// 		foreignKey: 'idOrganizacion',
	// 		as: 'organizacion'
	// 	})
	// }
	return catUsuarios
}