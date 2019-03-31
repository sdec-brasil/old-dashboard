export default function (sequelize, DataTypes) {
  const Block_Txin = sequelize.define('Block_Txin', {
    block_txin_uuid: {
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
    underscored: true,
    tableName: 'block_txin',
    indexes:
    [
      {
        unique: true,
        fields: ['block_id', 'txin_id'],
        allowNull: false,
      },
    ],
  });

  Block_Txin.associate = (models) => {
    Block_Txin.belongsTo(models.block, { as: '_block_id', foreignKey: { name: 'block_id', allowNull: false } });
    Block_Txin.belongsTo(models.block, { as: '_out_block_id', foreignKey: { name: 'out_block_id', allowNull: false } });
    Block_Txin.belongsTo(models.txin, { foreignKey: { name: 'txin_id', allowNull: false } });
  };

  return Block_Txin;
}
