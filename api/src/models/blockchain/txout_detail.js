export default function (sequelize, DataTypes) {
  return sequelize.define('txout_detail', {
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
    block_height: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    tx_pos: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    tx_id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    tx_hash: {
      type: 'BINARY(32)',
      allowNull: false,
    },
    tx_lockTime: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    tx_version: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    tx_size: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    txout_id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    txout_pos: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    txout_value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    txout_scriptPubKey: {
      type: 'MEDIUMBLOB',
      allowNull: true,
    },
    pubkey_id: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    pubkey_hash: {
      type: 'BINARY(20)',
      allowNull: true,
    },
    pubkey: {
      type: 'VARBINARY(65)',
      allowNull: true,
    },
  }, {
    tableName: 'txout_detail',
  });
}
