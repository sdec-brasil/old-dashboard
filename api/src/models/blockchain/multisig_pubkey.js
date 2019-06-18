export default function (sequelize, DataTypes) {
  const multisigPubkey = sequelize.define('multisig_pubkey', {
    multisig_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'pubkey',
        key: 'pubkey_id',
      },
    },
    pubkey_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'pubkey',
        key: 'pubkey_id',
      },
    },
  }, {
    tableName: 'multisig_pubkey',
    freezeTableName: true,
    timestamps: false,
  });
  return multisigPubkey;
}
