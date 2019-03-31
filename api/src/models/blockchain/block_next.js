export default function (sequelize, DataTypes) {
  const Block_Next = sequelize.define('Block_Next', {
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

  Block_Next.associate = (models) => {
    Block_Next.belongsTo(models.block, { as: 'next_block', foreignKey: 'next_block_id' });
    Block_Next.belongsTo(models.block, { as: 'block', foreignKey: 'block_id' });
  };
}
