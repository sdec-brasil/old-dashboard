module.exports = function (sequelize, DataTypes) {
  return sequelize.define('asset_address_balance', {
    asset_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'asset',
        key: 'asset_id',
      },
    },
    pubkey_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'pubkey',
        key: 'pubkey_id',
      },
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, {
    tableName: 'asset_address_balance',
  });
};
