export default function (sequelize, DataTypes) {
  return sequelize.define('Pubkey', {
    pubkey_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true,
    },
    pubkey_hash: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    pubkey: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    pubkey_flags: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  }, {
    underscored: true,
    tableName: 'pubkey',
  });
}
