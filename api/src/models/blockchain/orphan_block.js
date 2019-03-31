export default function (sequelize, DataTypes) {
  const Orphan_Block = sequelize.define('orphan_block', {
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

  Orphan_Block.associate = (models) => {
    Orphan_Block.belongsTo(models.block, { foreignKey: 'block_id' });
  };

  return Orphan_Block;
}
