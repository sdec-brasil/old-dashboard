export default function (sequelize, DataTypes) {
  const Multisig_Pubkey = sequelize.define('multisig_pubkey', {
    multisig_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    multisig_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'pubkey',
        key: 'pubkey_id',
      },
    },
    pubkey_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      references: {
        model: 'pubkey',
        key: 'pubkey_id',
      },
    },
  }, {
    underscored: true,
    tableName: 'multisig_pubkey',
    indexes:
    [
      {
        unique: true,
        fields: ['multisig_id', 'pubkey_id'],
        allowNull: false,
      },
    ],
  });

  Multisig_Pubkey.associate = (models) => {
    Multisig_Pubkey.belongsTo(models.pubkey, { as: '_multisig_id', foreignKey: { name: 'multisig_id', allowNull: false } });
    Multisig_Pubkey.belongsTo(models.pubkey, { as: '_pubkey_id', foreignKey: { name: 'pubkey_id', allowNull: false } });
  };

  return Multisig_Pubkey;
}
