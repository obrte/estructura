module.exports = (sequelize, DataTypes) => {
	const catFondos = sequelize.define('catFondos', {
		idFondo: {
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
	catFondos.associate = function (db) {
		catFondos.hasMany(db.catLocalidades, {
			foreignKey: 'idMunicipio',
			as: 'localidades'
		})
	}
	return catFondos
}