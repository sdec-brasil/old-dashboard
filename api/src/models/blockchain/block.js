export default function (sequelize, DataTypes) {
  const Block = sequelize.define('Block', {
    block_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true,
    },
    block_hash: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    block_version: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    block_hashMerkleRoot: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    block_nTime: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    block_nBits: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    block_nNonce: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    block_height: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    prev_block_id: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      references: {
        model: 'block',
        key: 'block_id',
      },
    },
    search_block_id: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      references: {
        model: 'block',
        key: 'block_id',
      },
    },
    block_chain_work: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    block_value_in: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    block_value_out: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    block_total_satoshis: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    block_total_seconds: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    block_satoshi_seconds: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    block_total_ss: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    block_num_tx: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    block_ss_destroyed: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  }, {
    underscored: true,
    tableName: 'block',
  });

  Block.associate = (models) => {
    Block.belongsTo(models.block, { as: 'prev_block', foreignKey: { name: 'prev_block_id', allowNull: true } });
    Block.belongsTo(models.block, { as: 'search_block', foreignKey: { name: 'search_block_id', allowNull: true } });
  };

  return Block;
}
