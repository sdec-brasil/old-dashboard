module.exports = function (sequelize, DataTypes) {
  return sequelize.define('block_tx', {
    block_tx_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    block_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'block',
        key: 'block_id',
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
    tx_pos: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'block_tx',
    indexdes:
    [
      {
        unique: true,
        fields: ['block_id', 'tx_id'],
        allowNull: false,
      },
      {
        unique: true,
        fields: ['block_id', 'tx_pos'],
        allowNull: false,
      },
    ],
  });
};
