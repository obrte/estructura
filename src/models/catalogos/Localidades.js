module.exports = (sequelize, DataTypes) => {
	const catLocalidades = sequelize.define('catLocalidades', {
		idLocalidad: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true
		},
		idMunicipio: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		nombre: {
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
	catLocalidades.associate = function (db) {
		catLocalidades.belongsTo(db.catMunicipios, {
			foreignKey: 'idMunicipio',
			as: 'municipio'
		})
	}
	return catLocalidades
}