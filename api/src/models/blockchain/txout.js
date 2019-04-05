export default function (sequelize, DataTypes) {
  const Txout = sequelize.define('Txout', {
    txout_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true,
    },
    tx_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    txout_pos: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    txout_value: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    txout_scriptPubKey: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    pubkey_id: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      references: {
        model: 'pubkey',
        key: 'pubkey_id',
      },
    },
  }, {
    underscored: true,
    tableName: 'txout',
    indexes:
    [
      {
        unique: true,
        fields: ['tx_id', 'txout_pos'],
      },
    ],
  });

  Txout.associate = (models) => {
    Txout.belongsTo(models.pubkey, { foreignKey: 'pubkey_id' });
  };

  return Txout;
}
