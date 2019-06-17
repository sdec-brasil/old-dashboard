export default function (sequelize, DataTypes) {
  const assetAddressBalance = sequelize.define('asset_address_balance', {
    asset_id: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'asset',
        key: 'asset_id',
      },
    },
    pubkey_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'pubkey',
        key: 'pubkey_id',
      },
    },
    balance: {
      type: DataTypes.DECIMAL(30, 0),
      allowNull: false,
    },
  }, {
    tableName: 'asset_address_balance',
    freezeTableName: true,
    timestamps: false,
  });
  return assetAddressBalance;
}
