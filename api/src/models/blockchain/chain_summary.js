export default function (sequelize, DataTypes) {
  return sequelize.define('chain_summary', {
    chain_id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    in_longest: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    block_id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    block_hash: {
      type: 'BINARY(32)',
      allowNull: false,
    },
    block_version: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    block_hashMerkleRoot: {
      type: 'BINARY(32)',
      allowNull: true,
    },
    block_nTime: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    block_nBits: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    block_nNonce: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    block_height: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    prev_block_id: {
      type: DataTypes.DECIMAL,
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
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    block_value_in: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    block_value_out: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    block_total_satoshis: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    block_total_seconds: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    block_satoshi_seconds: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    block_total_ss: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    block_ss_destroyed: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  }, {
    tableName: 'chain_summary',
  });
}
