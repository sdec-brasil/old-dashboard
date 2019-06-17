export default function (sequelize, DataTypes) {
  const txoutSeq = sequelize.define('txout_seq', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'txout_seq',
    freezeTableName: true,
    timestamps: false,
  });
  return txoutSeq;
}
