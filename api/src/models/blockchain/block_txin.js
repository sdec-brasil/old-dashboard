export default function (sequelize, DataTypes) {
  return sequelize.define('block_txin', {
    block_id: {
      type: DataTypes.DECIMAL(14, 0),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'block',
        key: 'block_id',
      },
    },
    txin_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'txin',
        key: 'txin_id',
      },
    },
    out_block_id: {
      type: DataTypes.DECIMAL(14, 0),
      allowNull: false,
      references: {
        model: 'block',
        key: 'block_id',
      },
    },
  }, {
    tableName: 'block_txin',
  });
}
