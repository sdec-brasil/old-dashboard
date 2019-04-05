export default function (sequelize, DataTypes) {
  const Txin = sequelize.define('Txin', {
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
      type: DataTypes.BLOB,
      allowNull: true,
    },
    txin_sequence: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  }, {
    underscored: true,
    tableName: 'txin',
    indexes:
    [
      {
        unique: true,
        fields: ['tx_id', 'txin_pos'],
        allowNull: false,
      },
    ],
  });

  Txin.associate = (models) => {
    Txin.belongsTo(models.tx, { foreignKey: 'tx_id' });
  };

  return Txin;
}
