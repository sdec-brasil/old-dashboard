module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tx', {
    tx_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true,
    },
    tx_hash: {
      type: DataTypes.BLOB(32), // changed type because of postgres naming
      allowNull: false,
    },
    tx_version: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    tx_lockTime: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    tx_size: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  }, {
    underscored: true,
    tableName: 'tx',
  });
};
