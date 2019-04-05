export default function (sequelize, DataTypes) {
  const Unliked_Txin = sequelize.define('Unlinked_Txin', {
    txin_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'txin',
        key: 'txin_id',
      },
    },
    txout_tx_hash: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    txout_pos: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'unlinked_txin',
  });

  Unliked_Txin.associate = (models) => {
    Unliked_Txin.belongsTo(models.txin, { foreingKey: 'txin_id' });
  };

  return Unliked_Txin;
}
