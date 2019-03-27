module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pubkey', {
		'pubkey_id': {
			type: DataTypes.DOUBLE,
			allowNull: false,
			primaryKey: true
		},
		'pubkey_hash': {
			type: "BINARY(20)",
			allowNull: false
		},
		'pubkey': {
			type: "VARBINARY(65)",
			allowNull: true
		},
		'pubkey_flags': {
			type: DataTypes.DOUBLE,
			allowNull: true
		}
	}, {
		tableName: 'pubkey'
	});
};
