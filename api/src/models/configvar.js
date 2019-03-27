module.exports = function(sequelize, DataTypes) {
	return sequelize.define('configvar', {
		'configvar_name': {
			type: DataTypes.STRING(100),
			allowNull: false,
			primaryKey: true
		},
		'configvar_value': {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'configvar'
	});
};
