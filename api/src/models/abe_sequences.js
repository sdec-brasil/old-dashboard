module.exports = function(sequelize, DataTypes) {
	return sequelize.define('abe_sequences', {
		'sequence_key': {
			type: DataTypes.STRING(100),
			allowNull: false,
			primaryKey: true
		},
		'nextid': {
			type: DataTypes.DOUBLE,
			allowNull: true
		}
	}, {
		tableName: 'abe_sequences'
	});
};
