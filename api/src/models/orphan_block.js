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
      type: DataTypes.BLOB(32),
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'orphan_block',
  });
};
