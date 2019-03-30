module.exports = function (sequelize, DataTypes) {
  return sequelize.define('asset', {
    asset_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true,
    },
    tx_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'tx',
        key: 'tx_id',
      },
    },
    chain_id: {
      type: DataTypes.DOUBLE,
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
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    issue_qty: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    prefix: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'asset',
  });
};
