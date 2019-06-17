export default function (sequelize, DataTypes) {
  const orphanBlock = sequelize.define('orphan_block', {
    block_id: {
      type: DataTypes.DECIMAL(14, 0),
      allowNull: false,
      primaryKey: true,
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
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        name: 'x_orphan_block_hashPrev',
        fields: ['block_hashPrev'],
      },
    ],
  });
  return orphanBlock;
}
