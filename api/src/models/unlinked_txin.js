module.exports = function (sequelize, DataTypes) {
  return sequelize.define('unlinked_txin', {
    txin_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'txin',
        key: 'txin_id',
      },
    },
    txout_tx_hash: {
      type: 'BINARY(32)',
      allowNull: false,
    },
    txout_pos: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, {
    tableName: 'unlinked_txin',
  });
};
