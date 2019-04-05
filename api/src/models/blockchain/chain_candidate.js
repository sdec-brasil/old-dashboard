export default function (sequelize, DataTypes) {
  return sequelize.define('chain_candidate', {
    chain_id: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
      primaryKey: true,
    },
    block_id: {
      type: DataTypes.DECIMAL(14, 0),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'block',
        key: 'block_id',
      },
    },
    in_longest: {
      type: DataTypes.DECIMAL(1, 0),
      allowNull: true,
    },
    block_height: {
      type: DataTypes.DECIMAL(14, 0),
      allowNull: true,
    },
  }, {
    tableName: 'chain_candidate',
  });
}
