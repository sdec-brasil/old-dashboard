export default function (sequelize, DataTypes) {
  const txinDetail = sequelize.define('txin_detail', {
    chain_id: {
      type: DataTypes.DECIMAL(10),
      allowNull: false,
    },
    in_longest: {
      type: DataTypes.DECIMAL(1),
      allowNull: true,
    },
    block_id: {
      type: DataTypes.DECIMAL(14),
      allowNull: false,
    },
    block_hash: {
      type: 'BINARY(32)',
      allowNull: false,
    },
    block_height: {
      type: DataTypes.DECIMAL(14),
      allowNull: true,
    },
    tx_pos: {
      type: DataTypes.DECIMAL(10),
      allowNull: false,
    },
    tx_id: {
      type: DataTypes.DECIMAL(26),
      allowNull: false,
    },
    tx_hash: {
      type: 'BINARY(32)',
      allowNull: false,
    },
    tx_lockTime: {
      type: DataTypes.DECIMAL(10),
      allowNull: true,
    },
    tx_version: {
      type: DataTypes.DECIMAL(10),
      allowNull: true,
    },
    tx_size: {
      type: DataTypes.DECIMAL(10),
      allowNull: true,
    },
    txin_id: {
      type: DataTypes.DECIMAL(26),
      allowNull: false,
    },
    txin_pos: {
      type: DataTypes.DECIMAL(10),
      allowNull: false,
    },
    prevout_id: {
      type: DataTypes.DECIMAL(26),
      allowNull: true,
    },
    txin_scriptSig: {
      type: 'MEDIUMBLOB',
      allowNull: true,
    },
    txin_sequence: {
      type: DataTypes.DECIMAL(10),
      allowNull: true,
    },
    txin_value: {
      type: DataTypes.DECIMAL(30),
      allowNull: true,
    },
    txin_scriptPubKey: {
      type: 'MEDIUMBLOB',
      allowNull: true,
    },
    pubkey_id: {
      type: DataTypes.DECIMAL(26),
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
    tableName: 'txin_detail',
    engine: 'MYISAM',
    freezeTableName: true,
    timestamps: false,
  });
  return txinDetail;
}
