export default function (sequelize, DataTypes) {
  return sequelize.define('asset_txid', {
    asset_id: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
      references: {
        model: 'asset',
        key: 'asset_id',
      },
    },
    tx_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: false,
      references: {
        model: 'tx',
        key: 'tx_id',
      },
    },
    txout_pos: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
    },
  }, {
    tableName: 'asset_txid',
  });
}
