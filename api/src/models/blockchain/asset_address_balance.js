export default function (sequelize, DataTypes) {
  const Asset_Address_Balance = sequelize.define('Asset_Address_Balance', {
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
    underscored: true,
    tableName: 'asset_address_balance',
  });

  Asset_Address_Balance.associate = (models) => {
    Asset_Address_Balance.belongsTo(models.Asset, { foreignKey: { name: 'asset_id', allowNull: false } });
    Asset_Address_Balance.belongsTo(models.Pubkey, { foreignKey: { name: 'pubkey_id', allowNull: false } });
  };

  return Asset_Address_Balance;
}
