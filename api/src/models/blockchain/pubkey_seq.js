export default function (sequelize, DataTypes) {
  return sequelize.define('pubkey_seq', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'pubkey_seq',
  });
}
