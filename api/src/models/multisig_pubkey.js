module.exports = function(sequelize, DataTypes) {
	return sequelize.define('multisig_pubkey', {
		'multisig_id': {
			type: DataTypes.DOUBLE,
			allowNull: false,
			references: {
				model: 'pubkey',
				key: 'pubkey_id'
			}
		},
		'pubkey_id': {
			type: DataTypes.DOUBLE,
			allowNull: false,
			references: {
				model: 'pubkey',
				key: 'pubkey_id'
			}
		}
	}, {
		tableName: 'multisig_pubkey'
	});
};
