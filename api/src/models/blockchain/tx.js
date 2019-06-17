export default function (sequelize, DataTypes) {
  const tx = sequelize.define('tx', {
    tx_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: false,
      primaryKey: true,
    },
    tx_hash: {
      type: 'BINARY(32)',
      allowNull: false,
      unique: true,
    },
    tx_version: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: true,
    },
    tx_lockTime: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: true,
    },
    tx_size: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: true,
    },
  }, {
    tableName: 'tx',
    freezeTableName: true,
    timestamps: false,
  });
  return tx;
}
