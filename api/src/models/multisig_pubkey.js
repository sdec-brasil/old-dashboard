module.exports = function (sequelize, DataTypes) {
  return sequelize.define('multisig_pubkey', {
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
};
