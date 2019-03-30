module.exports = function (sequelize, DataTypes) {
  return sequelize.define('block_txin', {
    block_txin_uuid: {
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
    txin_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'txin',
        key: 'txin_id',
      },
    },
    out_block_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'block',
        key: 'block_id',
      },
    },
  }, {
    underscored: true,
    tableName: 'block_txin',
    indexes:
    [
      {
        unique: true,
        fields: ['block_id', 'txin_id'],
        allowNull: false,
      },
    ],
  });
};
