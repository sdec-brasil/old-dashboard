module.exports = function(sequelize, DataTypes) {
	return sequelize.define('block_next', {
		'block_id': {
			type: DataTypes.DOUBLE,
			allowNull: false,
			references: {
				model: 'block',
				key: 'block_id'
			}
		},
		'next_block_id': {
			type: DataTypes.DOUBLE,
			allowNull: false,
			references: {
				model: 'block',
				key: 'block_id'
			}
		}
	}, {
		tableName: 'block_next'
	});
};
