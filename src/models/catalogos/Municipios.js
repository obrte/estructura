module.exports = (sequelize, DataTypes) => {
	const catMunicipios = sequelize.define('catMunicipios', {
		idMunicipio: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true
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
	catMunicipios.associate = function (db) {
		catMunicipios.hasMany(db.catLocalidades, {
			foreignKey: 'idMunicipio',
			as: 'localidades'
		})
	}
	return catMunicipios
}