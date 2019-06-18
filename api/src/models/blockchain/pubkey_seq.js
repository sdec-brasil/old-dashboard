export default function (sequelize, DataTypes) {
  const pubkeySeq = sequelize.define('pubkey_seq', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'pubkey_seq',
    freezeTableName: true,
    timestamps: false,
  });
  return pubkeySeq;
}
