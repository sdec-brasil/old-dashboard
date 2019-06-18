export default function (sequelize, DataTypes) {
  const txout = sequelize.define('txout', {
    txout_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: false,
      primaryKey: true,
    },
    tx_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: false,
    },
    txout_pos: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
    },
    txout_value: {
      type: DataTypes.DECIMAL(30, 0),
      allowNull: false,
    },
    txout_scriptPubKey: {
      type: 'MEDIUMBLOB',
      allowNull: true,
    },
    pubkey_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: true,
      references: {
        model: 'pubkey',
        key: 'pubkey_id',
      },
    },
  }, {
    tableName: 'txout',
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        name: 'x_txout_pubkey',
        fields: ['pubkey_id'],
      },
    ],
  });
  return txout;
}
