module.exports = function (sequelize, DataTypes) {
  return sequelize.define('txin', {
    txin_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true,
    },
    tx_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'tx',
        key: 'tx_id',
      },
    },
    txin_pos: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    txout_id: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    txin_scriptSig: {
      type: 'VARBINARY(1000000)',
      allowNull: true,
    },
    txin_sequence: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  }, {
    tableName: 'txin',
  });
};
