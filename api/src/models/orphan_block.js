module.exports = function (sequelize, DataTypes) {
  return sequelize.define('orphan_block', {
    block_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'block',
        key: 'block_id',
      },
    },
    block_hashPrev: {
      type: 'BINARY(32)',
      allowNull: false,
    },
  }, {
    tableName: 'orphan_block',
  });
};
