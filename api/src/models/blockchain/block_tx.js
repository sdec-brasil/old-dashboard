export default function (sequelize, DataTypes) {
  return sequelize.define('block_tx', {
    block_id: {
      type: DataTypes.DECIMAL(14, 0),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'block',
        key: 'block_id',
      },
    },
    tx_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tx',
        key: 'tx_id',
      },
    },
    tx_pos: {
      type: DataTypes.DECIMAL(10),
      allowNull: false,
    },
  }, {
    tableName: 'block_tx',
  });
}
