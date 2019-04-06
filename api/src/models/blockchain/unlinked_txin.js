export default function (sequelize, DataTypes) {
  return sequelize.define('unlinked_txin', {
    txin_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'txin',
        key: 'txin_id',
      },
    },
    txout_tx_hash: {
      type: 'BINARY(32)',
      allowNull: false,
    },
    txout_pos: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
    },
  }, {
    tableName: 'unlinked_txin',
    indexes: [
      {
        name: 'x_unlinked_txin_outpoint',
        fields: ['txout_tx_hash', 'txout_pos'],
      },
    ],
  });
}
