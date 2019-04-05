export default function (sequelize, DataTypes) {
  return sequelize.define('multisig_pubkey', {
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
  });
}
