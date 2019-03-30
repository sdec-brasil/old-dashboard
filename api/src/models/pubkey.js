module.exports = function (sequelize, DataTypes) {
  return sequelize.define('pubkey', {
    pubkey_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true,
    },
    pubkey_hash: {
      type: DataTypes.BLOB(20),
      allowNull: false,
    },
    pubkey: {
      type: DataTypes.BLOB(65),
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
};
