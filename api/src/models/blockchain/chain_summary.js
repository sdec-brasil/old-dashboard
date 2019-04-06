export default function (sequelize, DataTypes) {
  return sequelize.define('chain_summary', {
    chain_id: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
    },
    in_longest: {
      type: DataTypes.DECIMAL(1, 0),
      allowNull: true,
    },
    block_id: {
      type: DataTypes.DECIMAL(14, 0),
      allowNull: false,
    },
    block_hash: {
      type: 'BINARY(32)',
      allowNull: false,
    },
    block_version: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: true,
    },
    block_hashMerkleRoot: {
      type: 'BINARY(32)',
      allowNull: true,
    },
    block_nTime: {
      type: DataTypes.DECIMAL(20, 0),
      allowNull: true,
    },
    block_nBits: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: true,
    },
    block_nNonce: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: true,
    },
    block_height: {
      type: DataTypes.DECIMAL(14, 0),
      allowNull: true,
    },
    prev_block_id: {
      type: DataTypes.DECIMAL(14, 0),
      allowNull: true,
    },
    prev_block_hash: {
      type: 'BINARY(32)',
      allowNull: true,
    },
    block_chain_work: {
      type: 'BINARY(38)',
      allowNull: true,
    },
    block_num_tx: {
      type: DataTypes.DECIMAL(10),
      allowNull: false,
    },
    block_value_in: {
      type: DataTypes.DECIMAL(30),
      allowNull: true,
    },
    block_value_out: {
      type: DataTypes.DECIMAL(30),
      allowNull: true,
    },
    block_total_satoshis: {
      type: DataTypes.DECIMAL(26),
      allowNull: true,
    },
    block_total_seconds: {
      type: DataTypes.DECIMAL(20),
      allowNull: true,
    },
    block_satoshi_seconds: {
      type: DataTypes.DECIMAL(28),
      allowNull: true,
    },
    block_total_ss: {
      type: DataTypes.DECIMAL(28),
      allowNull: true,
    },
    block_ss_destroyed: {
      type: DataTypes.DECIMAL(28),
      allowNull: true,
    },
  }, {
    tableName: 'chain_summary',
    engine: 'MYISAM',
  });
}
