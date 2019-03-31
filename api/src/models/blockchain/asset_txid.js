export default function (sequelize, DataTypes) {
  const Asset_Txid = sequelize.define('Asset_Txid', {
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

  Asset_Txid.associate = (models) => {
    Asset_Txid.belongsTo(models.Tx, { foreignKey: { name: 'tx_id', allowNull: false } });
    Asset_Txid.belongsTo(models.Asset, { foreignKey: { name: 'asset_id', allowNull: false } });
  };

  return Asset_Txid;
}
