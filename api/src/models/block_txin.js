module.exports = function (sequelize, DataTypes) {
  return sequelize.define('block_txin', {
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
    tableName: 'block_txin',
  });
};
