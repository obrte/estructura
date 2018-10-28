module.exports = (sequelize, DataTypes) => {
	const catContratistas = sequelize.define('catContratistas', {
		idContratista: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true
		},
		nombre: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		rfc: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		direccion: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		telefono: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		correo: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		// Timestamps
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	}, {
		paranoid: false,
		underscored: true
	})
	//! Asociaciones
	catContratistas.associate = function (db) {
		catContratistas.belongsTo(db.catContratos, {
			foreignKey: 'idContratista',
			as: 'contratos'
		})
	}
	return catContratistas
}