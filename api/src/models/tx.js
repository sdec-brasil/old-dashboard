module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tx', {
    tx_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true,
    },
    tx_hash: {
      type: 'BINARY(32)',
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
    tableName: 'tx',
  });
};
