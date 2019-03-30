module.exports = function (sequelize, DataTypes) {
  return sequelize.define('block_next', {
    block_next_uuid: {
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
    next_block_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'block',
        key: 'block_id',
      },
    },
  }, {
    underscored: true,
    tableName: 'block_next',
    indexes:
    [
      {
        unique: true,
        fields: ['block_id', 'next_block_id'],
        allowNull: false,
      },
    ],
  });
};
