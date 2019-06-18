export default function (sequelize, DataTypes) {
  const block = sequelize.define(
    'block',
    {
      block_id: {
        type: DataTypes.DECIMAL(14, 0),
        allowNull: false,
        primaryKey: true,
      },
      block_hash: {
        type: 'BINARY(32)',
        allowNull: false,
        unique: true,
      },
      block_hash_string: {
        type: DataTypes.STRING(),
        allowNull: false,
        unique: true,
      },
      block_version: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      block_hashMerkleRoot: {
        type: 'BINARY(32)',
        allowNull: true,
      },
      block_nTime: {
        type: DataTypes.DECIMAL(20, 0),
        allowNull: true,
      },
      block_datetime: {
         type: DataTypes.DATE,
         allowNull: true,
      },
      block_nBits: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      block_nNonce: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      block_height: {
        type: DataTypes.DECIMAL(14, 0),
        allowNull: true,
      },
      prev_block_id: {
        type: DataTypes.DECIMAL(14, 0),
        allowNull: true,
        references: {
          model: 'block',
          key: 'block_id',
        },
      },
      search_block_id: {
        type: DataTypes.DECIMAL(14, 0),
        allowNull: true,
        references: {
          model: 'block',
          key: 'block_id',
        },
      },
      block_chain_work: {
        type: 'BINARY(38)',
        allowNull: true,
      },
      block_value_in: {
        type: DataTypes.DECIMAL(30, 0),
        allowNull: true,
      },
      block_value_out: {
        type: DataTypes.DECIMAL(30, 0),
        allowNull: true,
      },
      block_total_satoshis: {
        type: DataTypes.DECIMAL(26, 0),
        allowNull: true,
      },
      block_total_seconds: {
        type: DataTypes.DECIMAL(20, 0),
        allowNull: true,
      },
      block_satoshi_seconds: {
        type: DataTypes.DECIMAL(28, 0),
        allowNull: true,
      },
      block_total_ss: {
        type: DataTypes.DECIMAL(28, 0),
        allowNull: true,
      },
      block_num_tx: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: false,
      },
      block_ss_destroyed: {
        type: DataTypes.DECIMAL(28, 0),
        allowNull: true,
      },
    },
    {
      tableName: 'block',
      freezeTableName: true,
      timestamps: false,
    },
  );
  return block;
}
