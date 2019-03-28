module.exports = function (sequelize, DataTypes) {
  return sequelize.define('chain_candidate', {
    chain_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true,
    },
    block_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'block',
        key: 'block_id',
      },
    },
    in_longest: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    block_height: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  }, {
    tableName: 'chain_candidate',
  });
};
