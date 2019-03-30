module.exports = function (sequelize, DataTypes) {
  return sequelize.define('asset_txid', {
    asset_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'asset',
        key: 'asset_id',
      },
    },
    tx_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'tx',
        key: 'tx_id',
      },
    },
    txout_pos: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'asset_txid',
    indexes:
    [
      {
        unique: true,
        fields: ['asset_id', 'tx_id', 'txout_pos'],
      },
    ],
  });
};
