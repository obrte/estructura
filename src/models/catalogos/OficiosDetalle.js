module.exports = (sequelize, DataTypes) => {
	const oficiosDetalle = sequelize.define('oficiosDetalle', {
		idOficioDetalle: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true
		},
		idOficio: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		clave: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		nombreObra: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		municipio: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		localidad: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		importe: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		indirectos: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		// Timestamps
		created_at: DataTypes.DATE,
		updated_at: DataTypes.DATE
	}, {
		paranoid: false,
		underscored: true
	})
	//! Asociaciones
	// oficiosDetalle.associate = function (db) {
	// 	oficiosDetalle.belongsTo(db.catInstancias, {
	// 		foreignKey: 'idInstancia',
	// 		as: 'instancia'
	// 	})
	// }
	return oficiosDetalle
}