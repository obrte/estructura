module.exports = (sequelize, DataTypes) => {
	const catContratos = sequelize.define('catContratos', {
		idContrato: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true
		},
		idOficio: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		numero: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		fechaElaboracion: {
			type: DataTypes.DATE,
			allowNull: false
		},
		montoContrato: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true
		},
		montoAsignado: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true
		},
		anticipo: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true
		},
		idContratista: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		periodoInicio: {
			type: DataTypes.DATE,
			allowNull: false
		},
		periodoFin: {
			type: DataTypes.DATE,
			allowNull: false
		},
		inicioFirmaDGCLC: {
			type: DataTypes.DATE,
			allowNull: false
		},
		finFirmaDGCLC: {
			type: DataTypes.DATE,
			allowNull: false
		},
		inicioFirmaContratista: {
			type: DataTypes.DATE,
			allowNull: false
		},
		finFirmaContratista: {
			type: DataTypes.DATE,
			allowNull: false
		},
		inicioFirmaSOP: {
			type: DataTypes.DATE,
			allowNull: false
		},
		finFirmaSOP: {
			type: DataTypes.DATE,
			allowNull: false
		},
		envioExpediente: {
			type: DataTypes.DATE,
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
	// catContratos.associate = function (db) {
	// 	catContratos.belongsTo(db.catInstancias, {
	// 		foreignKey: 'idInstancia',
	// 		as: 'instancia'
	// 	})
	// }
	return catContratos
}