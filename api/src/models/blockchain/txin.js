export default function (sequelize, DataTypes) {
  const txin = sequelize.define('txin', {
    txin_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: false,
      primaryKey: true,
    },
    tx_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: false,
      references: {
        model: 'tx',
        key: 'tx_id',
      },
    },
    txin_pos: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
    },
    txout_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: true,
    },
    txin_scriptSig: {
      type: 'MEDIUMBLOB',
      allowNull: true,
    },
    txin_sequence: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: true,
    },
  }, {
    tableName: 'txin',
    freezeTableName: true,
    timestamps: false,
  });
  return txin;
}
