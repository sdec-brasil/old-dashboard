module.exports = function(sequelize, DataTypes) {
	return sequelize.define('block_tx', {
		'block_id': {
			type: DataTypes.DOUBLE,
			allowNull: false,
			references: {
				model: 'block',
				key: 'block_id'
			}
		},
		'tx_id': {
			type: DataTypes.DOUBLE,
			allowNull: false,
			references: {
				model: 'tx',
				key: 'tx_id'
			}
		},
		'tx_pos': {
			type: DataTypes.DOUBLE,
			allowNull: false
		}
	}, {
		tableName: 'block_tx'
	});
};
