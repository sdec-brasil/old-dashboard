export default function (sequelize, DataTypes) {
  return sequelize.define('Tx', {
    tx_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true,
    },
    tx_hash: {
      type: DataTypes.BLOB,
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
}
