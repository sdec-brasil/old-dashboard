export default function (sequelize, DataTypes) {
  const asset = sequelize.define('asset', {
    asset_id: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
      primaryKey: true,
    },
    tx_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: false,
      references: {
        model: 'tx',
        key: 'tx_id',
      },
      unique: true,
    },
    chain_id: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
      references: {
        model: 'chain',
        key: 'chain_id',
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    multiplier: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
    },
    issue_qty: {
      type: DataTypes.DECIMAL(30, 0),
      allowNull: false,
    },
    prefix: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
    },
  }, {
    tableName: 'asset',
    freezeTableName: true,
    timestamps: false,
  });
  return asset;
}
