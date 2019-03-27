module.exports = function(sequelize, DataTypes) {
	return sequelize.define('block', {
		'block_id': {
			type: DataTypes.DOUBLE,
			allowNull: false,
			primaryKey: true
		},
		'block_hash': {
			type: "BINARY(32)",
			allowNull: false
		},
		'block_version': {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		'block_hashMerkleRoot': {
			type: "BINARY(32)",
			allowNull: true
		},
		'block_nTime': {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		'block_nBits': {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		'block_nNonce': {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		'block_height': {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		'prev_block_id': {
			type: DataTypes.DOUBLE,
			allowNull: true,
			references: {
				model: 'block',
				key: 'block_id'
			}
		},
		'search_block_id': {
			type: DataTypes.DOUBLE,
			allowNull: true,
			references: {
				model: 'block',
				key: 'block_id'
			}
		},
		'block_chain_work': {
			type: "BINARY(38)",
			allowNull: true
		},
		'block_value_in': {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		'block_value_out': {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		'block_total_satoshis': {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		'block_total_seconds': {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		'block_satoshi_seconds': {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		'block_total_ss': {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		'block_num_tx': {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		'block_ss_destroyed': {
			type: DataTypes.DOUBLE,
			allowNull: true
		}
	}, {
		tableName: 'block'
	});
};
