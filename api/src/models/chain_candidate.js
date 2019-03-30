module.exports = function (sequelize, DataTypes) {
  return sequelize.define('chain_candidate', {
    chain_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    chain_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
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
    underscored: true,
    tableName: 'chain_candidate',
    indexes: [
      {
        unique: true,
        fields: ['chain_id', 'block_id'],
        allowNull: false,
      },
    ],
  });
};
