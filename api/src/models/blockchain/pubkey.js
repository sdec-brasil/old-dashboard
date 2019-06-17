export default function (sequelize, DataTypes) {
  const pubkey = sequelize.define('pubkey', {
    pubkey_id: {
      type: DataTypes.DECIMAL(26, 0),
      allowNull: false,
      primaryKey: true,
    },
    pubkey_hash: {
      type: 'BINARY(20)',
      allowNull: false,
      unique: true,
    },
    pubkey: {
      type: 'VARBINARY(65)',
      allowNull: true,
    },
    pubkey_flags: {
      type: DataTypes.DECIMAL(32, 0),
      allowNull: true,
    },
  }, {
    tableName: 'pubkey',
    freezeTableName: true,
    timestamps: false,
  });
  return pubkey;
}
